import { nanoid } from 'nanoid';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { razorpay } from '../config/razorpay.js';

export const createOrder = async (req, res) => {
  const { items, amount, paymentMethod, shippingAddress } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order must include at least one item' });
  }

  const normalizedItems = items.map((item) => ({
    productId: String(item?.product || ''),
    quantity: Number(item?.quantity)
  }));

  if (normalizedItems.some((item) => !item.productId || !Number.isInteger(item.quantity) || item.quantity <= 0)) {
    return res.status(400).json({ message: 'Invalid order items' });
  }

  const uniqueProductIds = [...new Set(normalizedItems.map((item) => item.productId))];
  const products = await Product.find({ _id: { $in: uniqueProductIds }, isActive: true }).select('_id price stock');

  if (products.length !== uniqueProductIds.length) {
    return res.status(400).json({ message: 'Some products are unavailable' });
  }

  const productMap = new Map(products.map((product) => [String(product._id), product]));
  let computedAmountInPaise = 0;
  const computedItems = [];

  for (const item of normalizedItems) {
    const product = productMap.get(item.productId);

    if (!product) {
      return res.status(400).json({ message: 'Some products are unavailable' });
    }

    if (typeof product.stock === 'number' && item.quantity > product.stock) {
      return res.status(400).json({ message: 'Requested quantity is not in stock' });
    }

    const itemPrice = Number(product.price);
    if (!Number.isFinite(itemPrice) || itemPrice < 0) {
      return res.status(400).json({ message: 'Invalid product pricing' });
    }

    const itemPriceInPaise = Math.round(itemPrice * 100);
    computedAmountInPaise += itemPriceInPaise * item.quantity;
    computedItems.push({ product: product._id, quantity: item.quantity, price: itemPrice });
  }

  const computedAmount = computedAmountInPaise / 100;
  const clientAmount = Number(amount);
  if (Number.isFinite(clientAmount) && Math.round(clientAmount * 100) !== computedAmountInPaise) {
    return res.status(400).json({ message: 'Order amount mismatch' });
  }

  const gstAmountInPaise = Math.round(computedAmountInPaise * 0.03);
  const finalAmountInPaise = computedAmountInPaise + gstAmountInPaise;
  const gstAmount = gstAmountInPaise / 100;
  const finalAmount = finalAmountInPaise / 100;

  const order = await Order.create({
    orderId: `DG-${Date.now()}`,
    user: req.user?.userId,
    items: computedItems,
    amount: computedAmount,
    gstAmount,
    finalAmount,
    paymentMethod,
    shippingAddress,
    invoiceNumber: `INV-${nanoid(8).toUpperCase()}`
  });

  if (paymentMethod !== 'Cash on Delivery') {
    const razorpayOrder = await razorpay.orders.create({ amount: finalAmountInPaise, currency: 'INR', receipt: order.orderId });
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
