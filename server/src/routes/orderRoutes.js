import { Router } from 'express';
import { createOrder, getMyOrders, listOrders } from '../controllers/orderController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = Router();
router.post('/', auth, createOrder);
router.get('/me', auth, getMyOrders);
router.get('/', auth, isAdmin, listOrders);

export default router;
