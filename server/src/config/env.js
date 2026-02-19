import dotenv from 'dotenv';
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

// Guard: refuse to boot in production with insecure defaults
if (isProd) {
  const required = ['JWT_SECRET', 'MONGODB_URI', 'RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'RAZORPAY_WEBHOOK_SECRET', 'FRONTEND_URL'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`[FATAL] Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
  if (process.env.JWT_SECRET === 'dgrand-secret') {
    console.error('[FATAL] Default JWT_SECRET detected in production. Set a strong secret.');
    process.exit(1);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd,
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dgrand',
  jwtSecret: process.env.JWT_SECRET || 'dgrand-dev-secret-change-me',
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  cloudKey: process.env.CLOUDINARY_API_KEY || '',
  cloudSecret: process.env.CLOUDINARY_API_SECRET || '',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};
