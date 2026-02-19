import { nanoid } from 'nanoid';
import Order from '../models/Order.js';
import { razorpay } from '../config/razorpay.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { items, amount, paymentMethod, shippingAddress } = req.body;
  const gstAmount = Math.round(amount * 0.03);
  const finalAmount = amount + gstAmount;
  const orderId = `DG-${Date.now()}`;
  let razorpayOrder = null;

  if (paymentMethod !== 'Cash on Delivery') {
    razorpayOrder = await razorpay.orders.create({
      amount: finalAmount * 100,
      currency: 'INR',
      receipt: orderId
    });
  }

  const order = await Order.create({
    orderId,
    user: req.user?.userId,
    items,
    amount,
    gstAmount,
    finalAmount,
    paymentMethod,
    shippingAddress,
    invoiceNumber: `INV-${nanoid(8).toUpperCase()}`
  });

  if (razorpayOrder) {
    return res.status(201).json({ order, razorpayOrder });
  }

  res.status(201).json({ order });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

export const listOrders = asyncHandler(async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'mobile');
  res.json(orders);
});
