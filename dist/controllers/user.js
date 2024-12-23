"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOtp = exports.forgotPassword = exports.login = exports.register = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_1 = __importDefault(require("../services/user"));
const http_status_1 = __importDefault(require("http-status"));
const email_1 = __importDefault(require("../services/email"));
exports.register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.createUser(req.body);
    const token = user.generateAuthToken();
    res.status(http_status_1.default.CREATED).json({ user, token });
}));
exports.login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.LoginUser(req.body);
    const token = user.generateAuthToken();
    res.status(http_status_1.default.OK).json({ user, token });
}));
exports.forgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = yield user_1.default.forgotPassword(req.body);
    const mailBody = {
        to: otp.email,
        subject: 'Password Reset',
        text: 'Your password reset code is ' + otp.otp,
        html: 'Your password reset code is ' + otp.otp,
    };
    yield email_1.default.sendMail(mailBody);
    res.status(http_status_1.default.OK).json({ otp });
}));
exports.verifyOtp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = yield user_1.default.verifyOtp(req.body);
    res.status(http_status_1.default.OK).json({ otp });
}));
exports.resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.resetPassword(req.body);
    const token = user.generateAuthToken();
    res.status(http_status_1.default.OK).json({ user, token });
}));
//# sourceMappingURL=user.js.map