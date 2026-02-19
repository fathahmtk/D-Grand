import { Router } from 'express';
import { loginWithOtp, sendOtp } from '../controllers/authController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
router.post('/send-otp', asyncHandler(sendOtp));
router.post('/verify-otp', asyncHandler(loginWithOtp));
export default router;
