import Joi from "joi";

export const createUserValidator = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),
  };

export const loginValidator = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  };

export const forgotPasswordValidator = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
};

export const verifyOtpValidator = {
    body: Joi.object().keys({
      otp: Joi.number().required(),
      email: Joi.string().required().email(),
    }),
  };

export const resetPasswordValidator = {
    body: Joi.object().keys({
      otp: Joi.number().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  };