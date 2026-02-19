import crypto from 'crypto';
import { nanoid } from 'nanoid';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { razorpay } from '../config/razorpay.js';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';

const ALLOWED_PAYMENT_METHODS = new Set(['UPI', 'Cards', 'Net Banking', 'Cash on Delivery']);
const requiredShippingFields = ['fullName', 'phone', 'line1', 'city', 'state', 'pincode'];

const isValidShippingAddress = (addr = {}) =>
  requiredShippingFields.every((f) => String(addr[f] || '').trim().length > 0);

// ─── Create Order ─────────────────────────────────────────────────────────────
export const createOrder = async (req, res) => {
  const { items, paymentMethod, shippingAddress } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'At least one order item is required' });
  }
  if (!ALLOWED_PAYMENT_METHODS.has(paymentMethod)) {
    return res.status(400).json({ message: 'Invalid payment method selected' });
  }
  if (!isValidShippingAddress(shippingAddress)) {
    return res.status(400).json({ message: 'A complete shipping address is required' });
  }

  // ── Step 1: Fetch & validate products ──────────────────────────────────────
  const requestedIds = [...new Set(items.map((i) => String(i.product)))];
  const products = await Product.find({ _id: { $in: requestedIds }, isActive: true }).select('_id price stock');
  const productById = new Map(products.map((p) => [String(p._id), p]));

  if (products.length !== requestedIds.length) {
    return res.status(400).json({ message: 'One or more items are unavailable' });
  }

  // ── Step 2: Build normalized items & calculate total ───────────────────────
  let hasInvalidItem = false;
  const normalizedItems = [];
  const amount = items.reduce((total, item) => {
    const product = productById.get(String(item.product));
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity <= 0 || quantity > 10) {
      hasInvalidItem = true;
      return total;
    }
    normalizedItems.push({ product: product._id, quantity, price: product.price });
    return total + product.price * quantity;
  }, 0);

  if (hasInvalidItem) {
    return res.status(400).json({ message: 'One or more order items are invalid (allowed quantity: 1–10)' });
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Order total must be greater than zero' });
  }

  // ── Step 3: Atomic stock reservation ──────────────────────────────────────
  // Uses Product.reserveStock which applies a conditional $inc — if another
  // request just bought the last unit, the Mongo filter won't match and we
  // return a 409 without ever persisting the order.
  const reservation = await Product.reserveStock(normalizedItems);
  if (!reservation.ok) {
    logger.warn(`Stock exhausted for product ${reservation.productId} during checkout`);
    return res.status(409).json({
      message: 'Sorry, one of the items just went out of stock. Please update your cart.',
      productId: reservation.productId,
    });
  }

  // ── Step 4: Persist the order ──────────────────────────────────────────────
  const gstAmount = Math.round(amount * 0.03);
  const finalAmount = amount + gstAmount;

  let order;
  try {
    order = await Order.create({
      orderId: `DG-${Date.now()}`,
      user: req.user?.userId,
      items: normalizedItems,
      amount,
      gstAmount,
      finalAmount,
      paymentMethod,
      shippingAddress,
      invoiceNumber: `INV-${nanoid(8).toUpperCase()}`,
      // COD orders are instantly "pending payment" — no gateway involved.
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'pending' : 'awaiting_gateway',
    });
  } catch (err) {
    // If DB write fails after stock was decremented, release the reservation.
    await Product.releaseStock(normalizedItems);
    throw err;
  }

  // ── Step 5: Create Razorpay order for online payments ─────────────────────
  if (paymentMethod !== 'Cash on Delivery') {
    try {
      const razorpayOrder = await razorpay.orders.create({
        amount: finalAmount * 100, // paise
        currency: 'INR',
        receipt: order.orderId,
      });
      // Store the Razorpay order ID so the webhook can look up this record
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();
      logger.info(`Razorpay order created: ${razorpayOrder.id} for order ${order.orderId}`);
      return res.status(201).json({ order, razorpayOrder });
    } catch (err) {
      // Razorpay call failed — release stock so products don't hang as "reserved".
      await Product.releaseStock(normalizedItems);
      await Order.findByIdAndDelete(order._id);
      logger.error(`Razorpay order creation failed: ${err.message}`);
      return res.status(502).json({ message: 'Payment gateway unavailable. Please try again.' });
    }
  }

  logger.info(`COD order placed: ${order.orderId}`);
  res.status(201).json({ order });
};

// ─── Razorpay Payment Webhook ─────────────────────────────────────────────────
// Razorpay sends a POST to this route after every payment event.
// The raw body (Buffer) MUST be used for HMAC — JSON-parsed body will mismatch.
export const razorpayWebhook = async (req, res) => {
  const signature = req.headers['x-razorpay-signature'];

  if (!signature) {
    return res.status(400).json({ message: 'Missing webhook signature' });
  }

  // ── Step 1: Verify HMAC ────────────────────────────────────────────────────
  const expectedSignature = crypto
    .createHmac('sha256', env.razorpayWebhookSecret)
    .update(req.body) // req.body is a raw Buffer here (see server.js middleware)
    .digest('hex');

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  ) {
    logger.warn('Razorpay webhook: invalid signature rejected');
    return res.status(400).json({ message: 'Invalid webhook signature' });
  }

  // ── Step 2: Parse and handle events ───────────────────────────────────────
  let event;
  try {
    event = JSON.parse(req.body.toString());
  } catch {
    return res.status(400).json({ message: 'Malformed webhook payload' });
  }

  const eventType = event.event;
  logger.info(`Razorpay webhook received: ${eventType}`);

  if (eventType === 'payment.captured') {
    const payment = event.payload?.payment?.entity;
    const razorpayOrderId = payment?.order_id;

    if (razorpayOrderId) {
      const updated = await Order.findOneAndUpdate(
        // Match by Razorpay receipt which we set to our orderId in createOrder
        { razorpayOrderId },
        {
          paymentStatus: 'paid',
          razorpayPaymentId: payment.id,
          status: 'confirmed',
        },
        { new: true }
      );

      if (updated) {
        logger.info(`Order ${updated.orderId} marked as PAID via webhook`);
      } else {
        // Fallback: match by amount + short window if razorpayOrderId isn't stored yet
        logger.warn(`Webhook: no order found for Razorpay order ${razorpayOrderId}`);
      }
    }
  }

  if (eventType === 'payment.failed') {
    const payment = event.payload?.payment?.entity;
    const razorpayOrderId = payment?.order_id;
    if (razorpayOrderId) {
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId },
        { paymentStatus: 'failed', status: 'payment_failed' },
        { new: true }
      );
      if (order) {
        // Re-open stock for failed payment
        await Product.releaseStock(order.items);
        logger.info(`Stock released for failed payment on order ${order.orderId}`);
      }
    }
  }

  // Always acknowledge Razorpay quickly (they retry on non-2xx)
  res.status(200).json({ received: true });
};

// ─── Customer Order History ───────────────────────────────────────────────────
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
  res.json(orders);
};

// ─── Admin: All Orders ────────────────────────────────────────────────────────
export const listOrders = async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'mobile');
  res.json(orders);
};
