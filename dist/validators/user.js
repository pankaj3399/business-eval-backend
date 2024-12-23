"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidator = exports.verifyOtpValidator = exports.forgotPasswordValidator = exports.loginValidator = exports.createUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserValidator = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
    }),
};
exports.loginValidator = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required(),
    }),
};
exports.forgotPasswordValidator = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
    }),
};
exports.verifyOtpValidator = {
    body: joi_1.default.object().keys({
        otp: joi_1.default.number().required(),
        email: joi_1.default.string().required().email(),
    }),
};
exports.resetPasswordValidator = {
    body: joi_1.default.object().keys({
        otp: joi_1.default.number().required(),
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required(),
    }),
};
//# sourceMappingURL=user.js.map