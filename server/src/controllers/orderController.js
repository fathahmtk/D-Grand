/**
 * OrderController — HTTP adapter only
 * Calls orderService, shapes the HTTP response. Zero business logic.
 */

import { orderService } from '../services/orderService.js';

export const createOrder = async (req, res) => {
  const result = await orderService.placeOrder(req.body, req.user?.userId);
  res.status(201).json(result);
};

export const razorpayWebhook = async (req, res) => {
  // req.body is a raw Buffer — set up in server.js before json() middleware
  await orderService.handleWebhook(req.body, req.headers['x-razorpay-signature']);
  res.json({ received: true });
};

export const getMyOrders = async (req, res) => {
  const orders = await orderService.getMyOrders(req.user.userId);
  res.json(orders);
};

export const listOrders = async (req, res) => {
  const orders = await orderService.listAllOrders(req.query);
  res.json(orders);
};
