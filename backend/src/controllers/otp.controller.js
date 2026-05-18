import Verification from "../models/Verification.js";

import generateOTP from "../utils/generateOTP.js";

import sendOTPEmail from "../services/email.service.js";

export const sendOTP = async (req, res) => {
  const { email } = req.body;

  const otp = generateOTP();

  await Verification.create({
    email,
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  });

  await sendOTPEmail(email, otp);

  res.json({
    success: true,
    message: "OTP generated successfully"
  });
};

export const verifyOTP = async (
  req,
  res
) => {
  const { email, otp } = req.body;

  const verification =
    await Verification.findOne({
      email,
      otp
    });

  if (!verification) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP"
    });
  }

  if (verification.expiresAt < Date.now()) {
    return res.status(400).json({
      success: false,
      message: "OTP expired"
    });
  }

  await Verification.deleteMany({ email });

  res.json({
    success: true,
    message: "OTP verified"
  });
};