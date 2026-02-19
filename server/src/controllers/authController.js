/**
 * AuthController — HTTP adapter only
 * Calls authService, shapes the HTTP response. Zero business logic.
 */

import { authService } from '../services/authService.js';

export const sendOtp = async (req, res) => {
  const result = authService.sendOtp(req.body.mobile);
  res.json(result);
};

export const loginWithOtp = async (req, res) => {
  const result = await authService.loginWithOtp(req.body.mobile, req.body.otp);
  res.json(result);
};
