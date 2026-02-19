/**
 * UserRepository — all Mongoose queries for the User collection
 */

import User from '../models/User.js';

export class UserRepository {
    /**
     * Find a user by their mobile number.
     * @param {string} mobile
     */
    async findByMobile(mobile) {
        return User.findOne({ mobile });
    }

    /**
     * Upsert: find or create a user by mobile.
     * @param {string} mobile
     * @returns {Promise<{ user: Document, isNew: boolean }>}
     */
    async findOrCreate(mobile) {
        const result = await User.findOneAndUpdate(
            { mobile },
            { $setOnInsert: { mobile } },
            { upsert: true, new: true, includeResultMetadata: true }
        );
        return { user: result.value, isNew: result.lastErrorObject?.upserted != null };
    }

    /**
     * Update profile fields for a user by ID.
     * @param {string} id
     * @param {object} updates  Only whitelisted fields are applied.
     */
    async updateById(id, updates) {
        const allowed = { name: updates.name };
        return User.findByIdAndUpdate(id, { $set: allowed }, { new: true });
    }

    /**
     * Add a product to the user's wishlist (idempotent — uses $addToSet).
     * @param {string} userId
     * @param {string} productId
     */
    async addToWishlist(userId, productId) {
        return User.findByIdAndUpdate(
            userId,
            { $addToSet: { wishlist: productId } },
            { new: true }
        );
    }

    /**
     * Remove a product from the user's wishlist.
     * @param {string} userId
     * @param {string} productId
     */
    async removeFromWishlist(userId, productId) {
        return User.findByIdAndUpdate(
            userId,
            { $pull: { wishlist: productId } },
            { new: true }
        );
    }

    /**
     * Add a new shipping address to the user's addresses array.
     * @param {string} userId
     * @param {object} address
     */
    async addAddress(userId, address) {
        return User.findByIdAndUpdate(
            userId,
            { $push: { addresses: address } },
            { new: true }
        );
    }
}

export const userRepository = new UserRepository();
