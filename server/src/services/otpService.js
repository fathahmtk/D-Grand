import crypto from 'crypto';

const otpStore = new Map();

const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex');

export const generateOtp = (mobile) => {
  const otp = String(Math.floor(100000 + Math.random() * 900000));

  otpStore.set(mobile, {
    otpHash: hashOtp(otp),
    expiresAt: Date.now() + 5 * 60 * 1000
  });

  return otp;
};

export const verifyOtp = (mobile, otp) => {
  const entry = otpStore.get(mobile);
  if (!entry || entry.expiresAt < Date.now()) return false;

  const providedOtpHash = hashOtp(otp);
  const isValid = crypto.timingSafeEqual(Buffer.from(entry.otpHash), Buffer.from(providedOtpHash));

  if (!isValid) return false;

  otpStore.delete(mobile);
  return true;
};
