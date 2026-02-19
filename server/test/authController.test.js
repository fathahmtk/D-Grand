import test from 'node:test';
import assert from 'node:assert/strict';

import { loginWithOtp, sendOtp } from '../src/controllers/authController.js';
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


test('sendOtp rejects invalid mobile formats', async () => {
  const req = { body: { mobile: '12345' } };
  const res = createRes();

  await sendOtp(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { message: 'Enter a valid 10-digit mobile number' });
});

test('loginWithOtp rejects missing otp', async () => {
  const req = { body: { mobile: '9990001111' } };
  const res = createRes();

  await loginWithOtp(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { message: 'OTP required' });
});

test('loginWithOtp rejects invalid mobile formats', async () => {
  const req = { body: { mobile: 'abc', otp: '123456' } };
  const res = createRes();

  await loginWithOtp(req, res);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { message: 'Enter a valid 10-digit mobile number' });
});
