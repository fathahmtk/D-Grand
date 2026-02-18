import { nanoid } from 'nanoid';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { razorpay } from '../config/razorpay.js';

export const createOrder = async (req, res) => {
  const { items, paymentMethod, shippingAddress } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'At least one order item is required' });
  }

  const requestedProductIds = items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: requestedProductIds }, isActive: true }).select('_id price');
  const productById = new Map(products.map((product) => [String(product._id), product]));

  if (products.length !== requestedProductIds.length) {
    return res.status(400).json({ message: 'One or more items are unavailable' });
  }

  let hasInvalidItem = false;
  const normalizedItems = [];
  const amount = items.reduce((total, item) => {
    const product = productById.get(String(item.product));
    const quantity = Number(item.quantity);

    if (!product || !Number.isInteger(quantity) || quantity <= 0) {
      hasInvalidItem = true;
      return total;
    }

    const lineTotal = product.price * quantity;
    normalizedItems.push({ product: product._id, quantity, price: product.price });
    return total + lineTotal;
  }, 0);

  if (hasInvalidItem) {
    return res.status(400).json({ message: 'One or more order items are invalid' });
  }

  const gstAmount = Math.round(amount * 0.03);
  const finalAmount = amount + gstAmount;

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Order total must be greater than zero' });
  }

  const order = await Order.create({
    orderId: `DG-${Date.now()}`,
    user: req.user?.userId,
    items: normalizedItems,
    amount,
    gstAmount,
    finalAmount,
    paymentMethod,
    shippingAddress,
    invoiceNumber: `INV-${nanoid(8).toUpperCase()}`
  });

  if (paymentMethod !== 'Cash on Delivery') {
    const razorpayOrder = await razorpay.orders.create({ amount: finalAmount * 100, currency: 'INR', receipt: order.orderId });
    return res.status(201).json({ order, razorpayOrder });
  }

  res.status(201).json({ order });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
  res.json(orders);
};

export const listOrders = async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'mobile');
  res.json(orders);
};
