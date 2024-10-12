import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import userService from '../services/user';
import httpStatus from 'http-status';
import emailService from '../services/email';

export const register = catchAsync(async (req:Request, res:Response) => {
    const user = await userService.createUser(req.body);
    const token = user.generateAuthToken();
    res.status(httpStatus.CREATED).json({ user, token });
});

export const login = catchAsync(async (req:Request, res:Response) => {
    const user = await userService.LoginUser(req.body);
    const token = user.generateAuthToken();
    res.status(httpStatus.OK).json({ user, token });
});

export const forgotPassword = catchAsync(async (req:Request, res:Response) => {
    const otp = await userService.forgotPassword(req.body);
    const mailBody = {
        to: otp.email,
        subject: 'Password Reset',
        text: 'Your password reset code is ' + otp.otp,
        html: 'Your password reset code is ' + otp.otp,
    };
    await emailService.sendMail(mailBody);
    res.status(httpStatus.OK).json({ otp });
});

export const verifyOtp = catchAsync(async (req:Request, res:Response) => {
    const otp = await userService.verifyOtp(req.body);
    res.status(httpStatus.OK).json({ otp });
});

export const resetPassword = catchAsync(async (req:Request, res:Response) => {
    const user = await userService.resetPassword(req.body);
    const token = user.generateAuthToken();
    res.status(httpStatus.OK).json({ user, token });
});

