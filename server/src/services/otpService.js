const otpStore = new Map();

export const generateOtp = (mobile) => {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  otpStore.set(mobile, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
  console.log(`OTP for ${mobile}: ${otp}`);
  return otp;
};

export const verifyOtp = (mobile, otp) => {
  const entry = otpStore.get(mobile);
  if (!entry || entry.expiresAt < Date.now()) return false;
  if (entry.otp !== otp) return false;
  otpStore.delete(mobile);
  return true;
};
