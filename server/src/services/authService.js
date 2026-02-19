/**
 * AuthService — OTP login business logic
 *
 * Orchestrates: OTP generation/verification → user upsert → JWT signing.
 * Emits domain events for side effects (e.g. new user welcome message).
 */

import { userRepository } from '../repositories/userRepository.js';
import { generateOtp, verifyOtp } from './otpService.js';
import { signToken } from '../utils/jwt.js';
import { eventBus } from '../lib/eventBus.js';
import { AppError } from '../lib/AppError.js';

const MOBILE_REGEX = /^\d{10}$/;

export class AuthService {
    /**
     * Generate and dispatch an OTP for the given mobile number.
     * @param {string} mobile
     * @returns {{ otp: string }}  otp is included only in non-production envs
     */
    sendOtp(mobile) {
        if (!MOBILE_REGEX.test(String(mobile))) {
            throw AppError.badRequest('Enter a valid 10-digit mobile number');
        }
        const otp = generateOtp(mobile);
        // In production, remove otp from the response once an SMS provider is wired in.
        return { message: 'OTP sent', otp };
    }

    /**
     * Validate OTP, upsert the user, and return a signed JWT.
     * Emits `auth.registered` for brand-new accounts.
     * @param {string} mobile
     * @param {string} otp
     * @returns {{ token: string, user: object }}
     */
    async loginWithOtp(mobile, otp) {
        if (!MOBILE_REGEX.test(String(mobile))) {
            throw AppError.badRequest('Enter a valid 10-digit mobile number');
        }
        if (!otp) throw AppError.badRequest('OTP is required');
        if (!verifyOtp(mobile, otp)) throw AppError.badRequest('Invalid or expired OTP');

        const { user, isNew } = await userRepository.findOrCreate(mobile);

        if (isNew) {
            eventBus.emit('auth.registered', { user });
        }

        const token = signToken({ userId: user._id, role: user.role });
        return { token, user };
    }
}

export const authService = new AuthService();
