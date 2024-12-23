"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const business_1 = __importDefault(require("./business"));
const router = express_1.default.Router();
router.use('/user', user_1.default);
router.use('/business', business_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map