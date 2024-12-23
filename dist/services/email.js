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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (body) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a transporter object for sending emails
    const transporter = yield nodemailer_1.default.createTransport({
        host: process.env.NODE_MAIL_HOST, // SMTP host
        port: 465, // Use 465 for SSL
        secure: true, // Use true for 465, false for other ports
        auth: {
            user: process.env.NODE_MAIL_EMAIL,
            pass: process.env.NODE_MAIL_PASSWORD,
        },
    });
    // Email options
    const mailOptions = {
        from: process.env.NODE_MAIL_EMAIL,
        to: body.to,
        subject: body.subject,
        text: body.text,
        html: body.html,
    };
    // Send the email
    yield transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Error:", error.message);
        }
        else {
            console.log("✅ Email sent:", info.response);
        }
    });
    return;
});
const emailService = {
    sendMail,
};
exports.default = emailService;
//# sourceMappingURL=email.js.map