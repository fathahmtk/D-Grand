/**
 * ProductService — business logic for products
 *
 * Controllers call this. This calls repositories.
 * No req/res, no Mongoose, fully unit-testable.
 */

import { productRepository } from '../repositories/productRepository.js';
import { AppError } from '../lib/AppError.js';

export class ProductService {
    /**
     * List products with optional filters and pagination.
     * @param {{ category?: string, q?: string, page?: number, limit?: number }} query
     */
    async listProducts(query = {}) {
        const limit = Math.min(Number(query.limit) || 24, 100); // cap at 100
        const page = Math.max(Number(query.page) || 1, 1);
        const skip = (page - 1) * limit;
        return productRepository.findAll({ category: query.category, q: query.q, limit, skip });
    }

    /**
     * Get a single product by ID.
     * Throws 404 if not found or inactive.
     * @param {string} id
     */
    async getProduct(id) {
        const product = await productRepository.findById(id);
        if (!product) throw AppError.notFound('Product');
        return product;
    }

    /**
     * Create a new product (admin only).
     * @param {object} data
     */
    async createProduct(data) {
        // Derive slug from title if not provided
        if (!data.slug && data.title) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
        return productRepository.create(data);
    }

    /**
     * Update a product (admin only).
     * Throws 404 if not found.
     * @param {string} id
     * @param {object} updates
     */
    async updateProduct(id, updates) {
        const product = await productRepository.updateById(id, updates);
        if (!product) throw AppError.notFound('Product');
        return product;
    }

    /**
     * Soft-delete a product (admin only).
     * @param {string} id
     */
    async deleteProduct(id) {
        const product = await productRepository.softDeleteById(id);
        if (!product) throw AppError.notFound('Product');
        return { success: true };
    }
}

export const productService = new ProductService();
