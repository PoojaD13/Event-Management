import nodemailer from "nodemailer";
import { env } from "../config/env.js";
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  // console.log("email is in process");
  await transporter.sendMail({
    from: `"Event Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
  // console.log("send event");
};

export default sendEmail;