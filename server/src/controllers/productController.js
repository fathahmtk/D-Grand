/**
 * ProductController — HTTP adapter only
 * Calls productService, shapes the HTTP response. Zero business logic.
 */

import { productService } from '../services/productService.js';

export const listProducts = async (req, res) => {
  const products = await productService.listProducts(req.query);
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await productService.getProduct(req.params.id);
  res.json(product);
};

export const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.json({ message: 'Product removed' });
};
