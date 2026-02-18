import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  pincode: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  name: String,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  addresses: [addressSchema],
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
