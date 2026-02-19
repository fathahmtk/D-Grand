import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import logger from './utils/logger.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// ─── Security Headers ────────────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────────────────────
// In production: locked to the trusted frontend origin only.
// In dev: open for localhost convenience.
app.use(
  cors({
    origin: env.isProd ? env.frontendUrl : true,
    credentials: true,
  })
);

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests. Please try again later.' },
});

// Stricter limit on auth to blunt OTP brute-force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many auth attempts. Please wait 15 minutes.' },
});

app.use(globalLimiter);

// ─── Raw Body for Razorpay Webhook ────────────────────────────────────────────
// Must be set BEFORE express.json() so the raw buffer is preserved for HMAC.
app.use(
  '/api/orders/webhook',
  express.raw({ type: 'application/json' })
);

// ─── Body Parser ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }));

// ─── HTTP Request Logging ─────────────────────────────────────────────────────
// Pipe morgan tokens into winston so all logs are in one stream.
const morganStream = { write: (msg) => logger.http(msg.trim()) };
app.use(morgan(env.isProd ? 'combined' : 'dev', { stream: morganStream }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) =>
  res.json({ status: 'ok', service: 'd-grand-api', env: env.nodeEnv })
);

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  logger.error({ message: err.message, stack: err.stack, statusCode: err.statusCode });
  res.status(err.statusCode || 500).json({
    message: err.message || 'Something went wrong',
    ...(env.isProd ? {} : { stack: err.stack }),
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
connectDb().then(() => {
  app.listen(env.port, () =>
    logger.info(`D-Grand API running on port ${env.port} [${env.nodeEnv}]`)
  );
});
