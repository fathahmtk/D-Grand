import { Router } from 'express';
import { createCoupon, listCoupons, updateCoupon } from '../controllers/adminController.js';
import { auth, isAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.get('/coupons', auth, isAdmin, asyncHandler(listCoupons));
router.post('/coupons', auth, isAdmin, asyncHandler(createCoupon));
router.put('/coupons/:id', auth, isAdmin, asyncHandler(updateCoupon));

export default router;
