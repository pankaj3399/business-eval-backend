import httpStatus from "http-status";
import db from "../models";
import user from "../models/user";
import { TUserTypes } from "../types";
import ApiError from "../utils/ApiError";

const createUser = async (body:TUserTypes) => {
    if(!body) {
        throw new ApiError(400, 'Please provide all the required fields');
    }
    const { name, email, password } = body;
    console.log(body);
    const existingUser = await db.user.findOne({ email });
    if (existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
    }
    const user = await db.user.create({ name, email, password });
    return user;
};

const LoginUser = async (body:{email:string,password:string}) => {
    const { email, password } = body;
    const user = await db.user.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }
    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials');
    }
    return user;
};

const forgotPassword = async (body:{email:string}) => {
    const { email } = body;
    const user = await db.user.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }
    let generatedOtp = Math.floor(100000 + Math.random() * 900000);
    const checkOtp = await db.otp.findOne({ email });
    if (checkOtp) {
        checkOtp.otp = generatedOtp;
        await checkOtp.save();
        return checkOtp;
    }
    else {
        const newOtp = await db.otp.create({ email, otp: generatedOtp });
        return newOtp;
    }
};

const verifyOtp = async (body:{email:string,otp:number}) => {
    const { email, otp } = body;
    const user = await db.user.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }
    const checkOtp = await db.otp.findOne({ email, otp });
    if (!checkOtp) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid OTP');
    }
    return checkOtp;
};

const resetPassword = async (body:{email:string,otp:number,password:string}) => {
    const { email, otp, password } = body;
    const user = await db.user.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
    }
    const checkOtp = await db.otp.findOne({ email, otp });
    if (!checkOtp) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid OTP');
    }
    user.password = password;
    await user.save();
    return user;
};

const userService = {
    createUser,
    LoginUser,
    forgotPassword,
    verifyOtp,
    resetPassword
};

export default userService;