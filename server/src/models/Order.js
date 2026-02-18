import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number, price: Number }],
  amount: Number,
  gstAmount: Number,
  finalAmount: Number,
  paymentMethod: { type: String, enum: ['UPI', 'Cards', 'Net Banking', 'Cash on Delivery'] },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  status: { type: String, default: 'placed' },
  shippingAddress: {
    fullName: String, phone: String, line1: String, city: String, state: String, pincode: String
  },
  invoiceNumber: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
