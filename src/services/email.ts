import nodemailer from "nodemailer";
import { TMailTypes } from "../types/mail";

const sendMail = async (body: TMailTypes) => {
  // Create a transporter object for sending emails
  const transporter = await nodemailer.createTransport({
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
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Error:", error.message);
    } else {
      console.log("✅ Email sent:", info.response);
    }
  });
  return;
};

const emailService = {
  sendMail,
};

export default emailService;
