/**
 * ProductRepository — all Mongoose queries for the Product collection
 *
 * Services interact only with this class, never with the Mongoose model
 * directly. This means:
 *  - Swapping MongoDB for another DB only requires changing this file.
 *  - Unit tests can mock this class without needing a real DB connection.
 *  - Query optimisation (indexes, projections, pagination) lives in one place.
 */

import Product from '../models/Product.js';

export class ProductRepository {
    /**
     * List active products with optional category and full-text search filters.
     * @param {{ category?: string, q?: string, limit?: number, skip?: number }} opts
     */
    async findAll({ category, q, limit = 50, skip = 0 } = {}) {
        const filter = { isActive: true };
        if (category) filter.category = category;
        if (q) filter.title = { $regex: q, $options: 'i' };
        return Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    }

    /**
     * Find a single active product by its Mongo _id.
     * @param {string} id
     */
    async findById(id) {
        return Product.findOne({ _id: id, isActive: true }).lean();
    }

    /**
     * Find a product by its URL slug.
     * @param {string} slug
     */
    async findBySlug(slug) {
        return Product.findOne({ slug, isActive: true }).lean();
    }

    /**
     * Find multiple products by their IDs and verify they are active.
     * Returns a Map<string, product> keyed by string _id.
     * @param {string[]} ids
     */
    async findManyByIds(ids) {
        const products = await Product.find({ _id: { $in: ids }, isActive: true })
            .select('_id price stock title')
            .lean();
        return new Map(products.map((p) => [String(p._id), p]));
    }

    /**
     * Create a new product document.
     * @param {object} data
     */
    async create(data) {
        return Product.create(data);
    }

    /**
     * Update a product by ID. Returns the updated document or null.
     * @param {string} id
     * @param {object} updates
     */
    async updateById(id, updates) {
        return Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    }

    /**
     * Soft-delete by setting isActive: false. Products are never hard-deleted
     * to preserve referential integrity in historical orders.
     * @param {string} id
     */
    async softDeleteById(id) {
        return Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    }

    /**
     * Atomically decrement stock for multiple products.
     * Delegates to the static method on the model (which uses conditional $inc).
     * @param {{ product: string, quantity: number }[]} items
     * @returns {{ ok: boolean, productId?: string }}
     */
    async reserveStock(items) {
        return Product.reserveStock(items);
    }

    /**
     * Release (restore) previously reserved stock.
     * @param {{ product: string, quantity: number }[]} items
     */
    async releaseStock(items) {
        return Product.releaseStock(items);
    }
}

// Export a singleton — repositories are stateless, one instance is enough.
export const productRepository = new ProductRepository();
