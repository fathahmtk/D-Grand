import { Router } from 'express';
import { createOrder, getMyOrders, listOrders } from '../controllers/orderController.js';
import { auth, isAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.post('/', auth, asyncHandler(createOrder));
router.get('/me', auth, asyncHandler(getMyOrders));
router.get('/', auth, isAdmin, asyncHandler(listOrders));

export default router;
