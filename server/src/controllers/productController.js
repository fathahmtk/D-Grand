import Product from '../models/Product.js';

export const listProducts = async (req, res) => {
  const { category, q } = req.query;
  const query = { isActive: true };
  if (category) query.category = category;
  if (q) query.title = { $regex: q, $options: 'i' };
  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};
