import User from '../models/User.js';
import { generateOtp, verifyOtp } from '../services/otpService.js';
import { signToken } from '../utils/jwt.js';

export const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: 'Mobile required' });
  generateOtp(mobile);
  res.json({ message: 'OTP sent' });
};

export const loginWithOtp = async (req, res) => {
  const { mobile, otp } = req.body;
  if (!verifyOtp(mobile, otp)) return res.status(400).json({ message: 'Invalid OTP' });

  const user = await User.findOneAndUpdate(
    { mobile },
    { $setOnInsert: { mobile } },
    { upsert: true, new: true }
  );

  const token = signToken({ userId: user._id, role: user.role });
  res.json({ token, user });
};
