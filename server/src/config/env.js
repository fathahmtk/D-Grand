import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dgrand',
  jwtSecret: process.env.JWT_SECRET || 'dgrand-secret',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  cloudKey: process.env.CLOUDINARY_API_KEY || '',
  cloudSecret: process.env.CLOUDINARY_API_SECRET || ''
};
