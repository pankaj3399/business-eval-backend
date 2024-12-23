"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const user_2 = require("../validators/user");
const validate_1 = __importDefault(require("../middleware/validate"));
const router = express_1.default.Router();
router.post('/register', (0, validate_1.default)(user_2.createUserValidator), user_1.register);
router.post('/login', (0, validate_1.default)(user_2.loginValidator), user_1.login);
router.post('/forgot-password', (0, validate_1.default)(user_2.forgotPasswordValidator), user_1.forgotPassword);
router.post('/verify-otp', (0, validate_1.default)(user_2.verifyOtpValidator), user_1.verifyOtp);
router.post('/reset-password', (0, validate_1.default)(user_2.resetPasswordValidator), user_1.resetPassword);
exports.default = router;
//# sourceMappingURL=user.js.map