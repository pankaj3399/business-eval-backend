import express from 'express';
import { forgotPassword, login, register, resetPassword, verifyOtp } from '../controllers/user';
import { createUserValidator, forgotPasswordValidator, loginValidator, resetPasswordValidator, verifyOtpValidator } from '../validators/user';
import validate from '../middleware/validate';

const router = express.Router();

router.post('/register', validate(createUserValidator), register);
router.post('/login', validate(loginValidator), login);
router.post('/forgot-password', validate(forgotPasswordValidator), forgotPassword);
router.post('/verify-otp', validate(verifyOtpValidator), verifyOtp);
router.post('/reset-password', validate(resetPasswordValidator),resetPassword);

export default router;