/**
 * orderListeners.js — domain event listeners for order lifecycle events
 *
 * This file is the ONLY place that knows about side effects.
 * OrderService emits events; this file reacts to them.
 *
 * To add WhatsApp notifications: add a listener here.
 * To add admin stock alerts: add a listener here.
 * OrderService never changes.
 *
 * Current listeners (stubs — replace with real integrations):
 *   order.placed         → send confirmation to customer
 *   order.confirmed      → send payment receipt, trigger fulfilment
 *   order.payment_failed → notify customer to retry
 *   auth.registered      → send welcome message to new customer
 */

import { eventBus } from '../lib/eventBus.js';
import logger from '../utils/logger.js';

// ─── order.placed ─────────────────────────────────────────────────────────────
// Fires for both COD and online orders immediately after order creation.
eventBus.on('order.placed', ({ order }) => {
    logger.info(`[Event] order.placed → ${order.orderId} (${order.paymentMethod})`);

    // TODO: Send WhatsApp confirmation to customer via Twilio / MSG91
    // await whatsappService.sendOrderConfirmation(order);

    // TODO: Send internal Telegram/Slack alert to the store owner
    // await notifyOwner(`New order: ${order.orderId} — ₹${order.finalAmount}`);
});

// ─── order.confirmed ─────────────────────────────────────────────────────────
// Fires when Razorpay webhook confirms payment was captured.
eventBus.on('order.confirmed', ({ order, payment }) => {
    logger.info(`[Event] order.confirmed → ${order.orderId}, payment: ${payment.id}`);

    // TODO: Send payment receipt with invoice PDF
    // await emailService.sendReceipt(order, payment);

    // TODO: Trigger fulfilment / Shiprocket API
    // await fulfilmentService.createShipment(order);
});

// ─── order.payment_failed ─────────────────────────────────────────────────────
// Fires when Razorpay reports a failed payment. Stock has already been released.
eventBus.on('order.payment_failed', ({ order }) => {
    logger.warn(`[Event] order.payment_failed → ${order.orderId}`);

    // TODO: Prompt customer to retry via WhatsApp / SMS
    // await whatsappService.sendRetryPrompt(order);
});

// ─── auth.registered ─────────────────────────────────────────────────────────
// Fires only on first-time OTP login (new account creation).
eventBus.on('auth.registered', ({ user }) => {
    logger.info(`[Event] auth.registered → new customer mobile: ${user.mobile}`);

    // TODO: Send welcome message + first-order discount code
    // await whatsappService.sendWelcome(user.mobile);
});
