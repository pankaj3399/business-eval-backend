"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const business_1 = __importDefault(require("./business"));
const otp_1 = __importDefault(require("./otp"));
const user_1 = __importDefault(require("./user"));
const db = {
    user: user_1.default,
    otp: otp_1.default,
    business: business_1.default
};
exports.default = db;
//# sourceMappingURL=index.js.map