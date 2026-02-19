import { Router } from 'express';
import { createOrder, getMyOrders, listOrders, razorpayWebhook } from '../controllers/orderController.js';
import { auth, isAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

// ─── Validation Schemas ───────────────────────────────────────────────────────

const createOrderSchema = {
    items: {
        required: true,
        type: 'array',
        custom: (val) => (val.length === 0 ? 'At least one item is required' : null),
    },
    paymentMethod: {
        required: true,
        type: 'string',
        custom: (val) =>
            ['UPI', 'Cards', 'Net Banking', 'Cash on Delivery'].includes(val)
                ? null
                : 'Invalid payment method',
    },
    shippingAddress: {
        required: true,
        custom: (val) =>
            typeof val === 'object' && val !== null ? null : 'shippingAddress must be an object',
    },
};

// ─── Routes ───────────────────────────────────────────────────────────────────

const router = Router();

// No auth on webhook — security is the HMAC signature in OrderService
router.post('/webhook', asyncHandler(razorpayWebhook));

router.post('/', auth, validate(createOrderSchema), asyncHandler(createOrder));
router.get('/me', auth, asyncHandler(getMyOrders));
router.get('/', auth, isAdmin, asyncHandler(listOrders));

export default router;
