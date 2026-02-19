/**
 * OrderRepository — all Mongoose queries for the Order collection
 */

import Order from '../models/Order.js';

export class OrderRepository {
    /**
     * Create a new order document.
     * @param {object} data
     */
    async create(data) {
        return Order.create(data);
    }

    /**
     * Find all orders belonging to a specific user, newest first.
     * @param {string} userId
     */
    async findByUser(userId) {
        return Order.find({ user: userId }).sort({ createdAt: -1 }).lean();
    }

    /**
     * Find a single order by our internal orderId string (e.g. "DG-1234").
     * @param {string} orderId
     */
    async findByOrderId(orderId) {
        return Order.findOne({ orderId }).lean();
    }

    /**
     * Find a single order by the Razorpay order ID (used by webhook).
     * @param {string} razorpayOrderId
     */
    async findByRazorpayOrderId(razorpayOrderId) {
        return Order.findOne({ razorpayOrderId });
    }

    /**
     * Update order fields by MongoDB _id.
     * @param {string} id
     * @param {object} updates
     */
    async updateById(id, updates) {
        return Order.findByIdAndUpdate(id, updates, { new: true });
    }

    /**
     * Update order fields using razorpayOrderId as the lookup key.
     * Used by the payment webhook to mark orders paid/failed.
     * @param {string} razorpayOrderId
     * @param {object} updates
     */
    async updateByRazorpayOrderId(razorpayOrderId, updates) {
        return Order.findOneAndUpdate({ razorpayOrderId }, updates, { new: true });
    }

    /**
     * Delete an order by MongoDB _id (used only for rollback on Razorpay failure).
     * @param {string} id
     */
    async deleteById(id) {
        return Order.findByIdAndDelete(id);
    }

    /**
     * Admin: all orders, newest first, with user mobile populated.
     * Paginated to avoid unbounded queries on large datasets.
     * @param {{ limit?: number, skip?: number }} opts
     */
    async findAll({ limit = 50, skip = 0 } = {}) {
        return Order.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'mobile name')
            .lean();
    }
}

export const orderRepository = new OrderRepository();
