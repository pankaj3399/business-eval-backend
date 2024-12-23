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
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        return res.status(http_status_1.default.UNAUTHORIZED).json({
                            message: "Token expired.Login Again",
                        });
                    }
                    let authenticatedUser = yield models_1.default.user.findById(decoded._id).lean();
                    if (!authenticatedUser) {
                        return res.status(http_status_1.default.UNAUTHORIZED).json({
                            message: "You are not authorized to access this route",
                            success: false,
                        });
                    }
                    req.user = authenticatedUser;
                    next();
                }));
            }
            else {
                res.status(403).json({
                    message: "token is not present in headers",
                });
            }
        }
        else {
            res.status(403).json({
                message: "headers does not have a bearer token",
            });
        }
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Token expired.Login Again');
    }
});
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=auth.js.map