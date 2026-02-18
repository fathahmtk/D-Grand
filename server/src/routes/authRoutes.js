import { Router } from 'express';
import { loginWithOtp, sendOtp } from '../controllers/authController.js';

const router = Router();
router.post('/send-otp', sendOtp);
router.post('/verify-otp', loginWithOtp);
export default router;
