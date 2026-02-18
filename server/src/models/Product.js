import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  originalPrice: Number,
  discountPercent: Number,
  description: String,
  stock: { type: Number, default: 0 },
  variants: [{ color: String, design: String, sku: String, stock: Number }],
  images: [{ url: String, angle: String, publicId: String }],
  tags: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
