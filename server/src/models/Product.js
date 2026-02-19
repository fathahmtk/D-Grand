import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    discountPercent: Number,
    description: String,
    stock: { type: Number, default: 0, min: 0 },
    variants: [{ color: String, design: String, sku: String, stock: Number }],
    images: [{ url: String, angle: String, publicId: String }],
    tags: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/**
 * Atomically decrement stock for multiple products in a single findOneAndUpdate
 * call per product. Returns { ok: true } on success or { ok: false, productId }
 * for the first item that has insufficient stock.
 *
 * Uses $inc with a conditional filter on `stock >= qty` to guarantee
 * atomicity and prevent race conditions when two buyers hit the last unit.
 */
productSchema.statics.reserveStock = async function (items) {
  const ops = items.map(({ product, quantity }) =>
    this.findOneAndUpdate(
      { _id: product, stock: { $gte: quantity }, isActive: true },
      { $inc: { stock: -quantity } },
      { new: true, select: '_id stock' }
    )
  );

  const results = await Promise.all(ops);

  for (let i = 0; i < results.length; i++) {
    if (!results[i]) {
      return { ok: false, productId: items[i].product };
    }
  }

  return { ok: true };
};

/**
 * Roll back a previous stock reservation (used when payment fails after stock
 * has been decremented).
 */
productSchema.statics.releaseStock = async function (items) {
  const ops = items.map(({ product, quantity }) =>
    this.updateOne({ _id: product }, { $inc: { stock: quantity } })
  );
  await Promise.all(ops);
};

export default mongoose.model('Product', productSchema);
