import { Router } from 'express';
import { createCoupon, listCoupons, updateCoupon } from '../controllers/adminController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = Router();
router.get('/coupons', auth, isAdmin, listCoupons);
router.post('/coupons', auth, isAdmin, createCoupon);
router.put('/coupons/:id', auth, isAdmin, updateCoupon);

export default router;
