import test from 'node:test';
import assert from 'node:assert/strict';

import { sendOtp } from '../src/controllers/authController.js';
import { verifyOtp } from '../src/services/otpService.js';

const createRes = () => {
  const res = {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  return res;
};

test('sendOtp returns OTP in response body for current in-memory flow', async () => {
  const req = { body: { mobile: '9990001111' } };
  const res = createRes();

  await sendOtp(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.message, 'OTP sent');
  assert.match(res.body.otp, /^\d{6}$/);
  assert.equal(verifyOtp(req.body.mobile, res.body.otp), true);
});

test('sendOtp rejects requests without mobile', async () => {
  const req = { body: {} };
  const res = createRes();

  await sendOtp(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { message: 'Mobile required' });
});
