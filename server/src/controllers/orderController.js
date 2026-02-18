import { nanoid } from 'nanoid';
import Order from '../models/Order.js';
import { razorpay } from '../config/razorpay.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, amount, paymentMethod, shippingAddress } = req.body;
    const gstAmount = Math.round(amount * 0.03);
    const finalAmount = amount + gstAmount;
    const orderId = `DG-${Date.now()}`;
    let razorpayOrder = null;

    if (paymentMethod !== 'Cash on Delivery') {
      razorpayOrder = await razorpay.orders.create({ amount: finalAmount * 100, currency: 'INR', receipt: orderId });
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
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const listOrders = async (_req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'mobile');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
