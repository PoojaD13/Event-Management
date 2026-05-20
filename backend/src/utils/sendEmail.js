import nodemailer from "nodemailer";
import { env } from "../config/env.js";
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

// const sendEmail = async ({ to, subject, html }) => {
//   // console.log("email is in process");
//   await transporter.sendMail({
//     from: `"Event Team" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });
//   // console.log("send event");
// };
const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  await transporter.sendMail({
    from: `"Event Team" <${env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
};

export default sendEmail;