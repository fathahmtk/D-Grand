import User from '../models/User.js';
import { generateOtp, verifyOtp } from '../services/otpService.js';
import { signToken } from '../utils/jwt.js';

const MOBILE_REGEX = /^\d{10}$/;

export const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: 'Mobile required' });
  if (!MOBILE_REGEX.test(String(mobile))) {
    return res.status(400).json({ message: 'Enter a valid 10-digit mobile number' });
  }
  const otp = generateOtp(mobile);
  // This project currently uses an in-memory OTP service with no SMS provider,
  // so include the OTP in the response to keep the verification flow usable.
  res.json({ message: 'OTP sent', otp });
};

export const loginWithOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!MOBILE_REGEX.test(String(mobile))) {
    return res.status(400).json({ message: 'Enter a valid 10-digit mobile number' });
  }

  if (!otp) {
    return res.status(400).json({ message: 'OTP required' });
  }

  if (!verifyOtp(mobile, otp)) return res.status(400).json({ message: 'Invalid OTP' });

  const user = await User.findOneAndUpdate(
    { mobile },
    { $setOnInsert: { mobile } },
    { upsert: true, new: true }
  );

  const token = signToken({ userId: user._id, role: user.role });
  res.json({ token, user });
};
