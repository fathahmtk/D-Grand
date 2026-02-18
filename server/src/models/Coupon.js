import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['flat', 'percent'], default: 'percent' },
  value: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  expiresAt: Date
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
