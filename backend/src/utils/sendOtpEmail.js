// utils/sendOtpEmail.js
import sendEmail from "./sendEmail.js";

/**
 * Send OTP email
 * @param {string} to - recipient email
 * @param {string} otp - OTP code
 */
export const sendOtpEmail = async (to, otp) => {
  const subject = "Verify Your Email for Event Platform";
  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center;">
      <h2>Event Platform Email Verification</h2>
      <p>Your One-Time Password (OTP) is:</p>
      <h1 style="color: #4CAF50;">${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;
  await sendEmail({ to, subject, html });
};