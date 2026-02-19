import { Router } from 'express';
import { createOrder, getMyOrders, listOrders, razorpayWebhook } from '../controllers/orderController.js';
import { auth, isAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

// ── Razorpay webhook — NO auth, raw body is critical (see server.js) ────────
router.post('/webhook', asyncHandler(razorpayWebhook));

// ── Customer routes ──────────────────────────────────────────────────────────
router.post('/', auth, asyncHandler(createOrder));
router.get('/me', auth, asyncHandler(getMyOrders));

// ── Admin routes ─────────────────────────────────────────────────────────────
router.get('/', auth, isAdmin, asyncHandler(listOrders));

export default router;
