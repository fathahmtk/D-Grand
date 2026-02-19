/**
 * OrderService — full order lifecycle business logic
 *
 * Handles: validation → stock reservation → order creation →
 *          Razorpay initiation → rollback on failure → domain events
 *
 * No req/res. No Mongoose. Fully unit-testable with mocked repositories.
 */

import crypto from 'crypto';
import { nanoid } from 'nanoid';
import { orderRepository } from '../repositories/orderRepository.js';
import { productRepository } from '../repositories/productRepository.js';
import { razorpay } from '../config/razorpay.js';
import { env } from '../config/env.js';
import { eventBus } from '../lib/eventBus.js';
import { AppError } from '../lib/AppError.js';
import logger from '../utils/logger.js';

const ALLOWED_PAYMENT_METHODS = new Set(['UPI', 'Cards', 'Net Banking', 'Cash on Delivery']);
const REQUIRED_SHIPPING_FIELDS = ['fullName', 'phone', 'line1', 'city', 'state', 'pincode'];

// ─── Private helpers ──────────────────────────────────────────────────────────

function validateShipping(addr = {}) {
    const missing = REQUIRED_SHIPPING_FIELDS.filter((f) => !String(addr[f] || '').trim());
    if (missing.length > 0) {
        throw AppError.badRequest(`Shipping address is incomplete. Missing: ${missing.join(', ')}`);
    }
}

function calculateTotals(items, productMap) {
    const normalizedItems = [];
    let amount = 0;

    for (const item of items) {
        const product = productMap.get(String(item.product));
        const quantity = Number(item.quantity);

        if (!product || !Number.isInteger(quantity) || quantity <= 0 || quantity > 10) {
            throw AppError.badRequest('One or more order items are invalid (qty must be 1–10)');
        }

        normalizedItems.push({ product: product._id, quantity, price: product.price });
        amount += product.price * quantity;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        throw AppError.badRequest('Order total must be greater than zero');
    }

    const gstAmount = Math.round(amount * 0.03);
    return { normalizedItems, amount, gstAmount, finalAmount: amount + gstAmount };
}

export class OrderService {
    // ─── Place Order ────────────────────────────────────────────────────────────
    /**
     * Full order creation flow with atomic stock reservation.
     * @param {{ items, paymentMethod, shippingAddress }} dto
     * @param {string|null} userId
     * @returns {{ order: object, razorpayOrder?: object }}
     */
    async placeOrder({ items, paymentMethod, shippingAddress }, userId) {
        // 1. Input validation
        if (!Array.isArray(items) || items.length === 0) {
            throw AppError.badRequest('At least one order item is required');
        }
        if (!ALLOWED_PAYMENT_METHODS.has(paymentMethod)) {
            throw AppError.badRequest('Invalid payment method');
        }
        validateShipping(shippingAddress);

        // 2. Fetch & validate products from DB
        const requestedIds = [...new Set(items.map((i) => String(i.product)))];
        const productMap = await productRepository.findManyByIds(requestedIds);

        if (productMap.size !== requestedIds.length) {
            throw AppError.badRequest('One or more items are unavailable');
        }

        // 3. Build line items and compute totals
        const { normalizedItems, amount, gstAmount, finalAmount } = calculateTotals(items, productMap);

        // 4. Atomic stock reservation
        const reservation = await productRepository.reserveStock(normalizedItems);
        if (!reservation.ok) {
            throw AppError.conflict(
                'Sorry, one item just went out of stock. Please update your cart.',
                { productId: reservation.productId }
            );
        }

        // 5. Persist the order (rollback stock if this fails)
        let order;
        try {
            order = await orderRepository.create({
                orderId: `DG-${Date.now()}`,
                user: userId || null,
                items: normalizedItems,
                amount,
                gstAmount,
                finalAmount,
                paymentMethod,
                shippingAddress,
                invoiceNumber: `INV-${nanoid(8).toUpperCase()}`,
                paymentStatus: paymentMethod === 'Cash on Delivery' ? 'pending' : 'awaiting_gateway',
            });
        } catch (err) {
            await productRepository.releaseStock(normalizedItems);
            throw err;
        }

        // 6. COD orders are done — emit event and return
        if (paymentMethod === 'Cash on Delivery') {
            logger.info(`COD order placed: ${order.orderId}`);
            eventBus.emit('order.placed', { order });
            return { order };
        }

        // 7. Online payment — create Razorpay order
        try {
            const razorpayOrder = await razorpay.orders.create({
                amount: finalAmount * 100,
                currency: 'INR',
                receipt: order.orderId,
            });

            // Store Razorpay order ID so the webhook can find this record
            order = await orderRepository.updateById(order._id, {
                razorpayOrderId: razorpayOrder.id,
            });

            logger.info(`Razorpay order created: ${razorpayOrder.id} → ${order.orderId}`);
            eventBus.emit('order.placed', { order });
            return { order, razorpayOrder };
        } catch (err) {
            // Razorpay unavailable — full rollback
            await productRepository.releaseStock(normalizedItems);
            await orderRepository.deleteById(order._id);
            logger.error(`Razorpay order creation failed: ${err.message}`);
            throw AppError.serviceUnavailable('Payment gateway unavailable. Please try again.');
        }
    }

    // ─── Webhook: Handle Razorpay Events ────────────────────────────────────────
    /**
     * Verify HMAC signature and process a Razorpay payment event.
     * @param {Buffer}  rawBody    Raw request body buffer
     * @param {string}  signature  x-razorpay-signature header value
     */
    async handleWebhook(rawBody, signature) {
        if (!signature) throw AppError.badRequest('Missing webhook signature');

        const expected = crypto
            .createHmac('sha256', env.razorpayWebhookSecret)
            .update(rawBody)
            .digest('hex');

        const sigBuffer = Buffer.from(signature.padEnd(64, '0'), 'hex');
        const expBuffer = Buffer.from(expected.padEnd(64, '0'), 'hex');

        if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
            logger.warn('Razorpay webhook: invalid signature rejected');
            throw AppError.badRequest('Invalid webhook signature');
        }

        let event;
        try {
            event = JSON.parse(rawBody.toString());
        } catch {
            throw AppError.badRequest('Malformed webhook payload');
        }

        const { event: eventType, payload } = event;
        logger.info(`Razorpay webhook: ${eventType}`);

        if (eventType === 'payment.captured') {
            await this._handlePaymentCaptured(payload);
        } else if (eventType === 'payment.failed') {
            await this._handlePaymentFailed(payload);
        }
    }

    async _handlePaymentCaptured(payload) {
        const payment = payload?.payment?.entity;
        if (!payment?.order_id) return;

        const order = await orderRepository.updateByRazorpayOrderId(payment.order_id, {
            paymentStatus: 'paid',
            razorpayPaymentId: payment.id,
            status: 'confirmed',
        });

        if (order) {
            logger.info(`Order ${order.orderId} marked PAID`);
            eventBus.emit('order.confirmed', { order, payment });
        } else {
            logger.warn(`Webhook: no order found for Razorpay order ${payment.order_id}`);
        }
    }

    async _handlePaymentFailed(payload) {
        const payment = payload?.payment?.entity;
        if (!payment?.order_id) return;

        const order = await orderRepository.updateByRazorpayOrderId(payment.order_id, {
            paymentStatus: 'failed',
            status: 'payment_failed',
        });

        if (order) {
            await productRepository.releaseStock(order.items);
            logger.info(`Stock released for failed payment on order ${order.orderId}`);
            eventBus.emit('order.payment_failed', { order });
        }
    }

    // ─── Queries ─────────────────────────────────────────────────────────────────
    async getMyOrders(userId) {
        return orderRepository.findByUser(userId);
    }

    async listAllOrders({ page = 1, limit = 50 } = {}) {
        const skip = (page - 1) * limit;
        return orderRepository.findAll({ limit, skip });
    }
}

export const orderService = new OrderService();
