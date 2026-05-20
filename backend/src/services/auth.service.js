// import jwt from "jsonwebtoken";

// import User from "../models/User.js";

// import generateToken from "../utils/generateToken.js";
// import generateRefreshToken from "../utils/generateRefreshToken.js";

// import { blacklistToken } from "./tokenBlacklist.service.js";

// /**
//  * REGISTER USER
//  */
// export const registerUserService = async (data) => {
//   const user = await User.create(data);

//   const accessToken = generateToken({
//     id: user._id,
//     role: user.role,
//   });

//   const refreshToken = generateRefreshToken({
//     id: user._id,
//   });

//   user.refreshToken = refreshToken;
//   await user.save();

//   return {
//     user,
//     accessToken,
//     refreshToken,
//   };
// };

// /**
//  * LOGIN USER
//  */
// export const loginUserService = async ({ email, password }) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const isMatch = await user.comparePassword(password);

//   if (!isMatch) {
//     throw new Error("Invalid credentials");
//   }

//   const accessToken = generateToken({
//     id: user._id,
//     role: user.role,
//   });

//   const refreshToken = generateRefreshToken({
//     id: user._id,
//   });

//   user.refreshToken = refreshToken;
//   await user.save();

//   return {
//     user,
//     accessToken,
//     refreshToken,
//   };
// };

// /**
//  * REFRESH TOKEN
//  */
// export const refreshTokenService = async (refreshToken) => {
//   const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

//   const user = await User.findById(decoded.id);

//   if (!user || user.refreshToken !== refreshToken) {
//     throw new Error("Invalid refresh token");
//   }

//   const accessToken = generateToken({
//     id: user._id,
//     role: user.role,
//   });

//   return {
//     accessToken,
//   };
// };

// /**
//  * LOGOUT USER
//  */
// export const logoutService = async (userId, token) => {
//   if (!token) {
//     throw new Error("Token missing");
//   }

//   const decoded = jwt.decode(token);

//   const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

//   await blacklistToken(token, expiresIn);

//   await User.findByIdAndUpdate(userId, {
//     refreshToken: null,
//   });

//   return true;
// };

// testing

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Otp from "../models/Otp.js";

import generateToken from "../utils/generateToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { blacklistToken } from "./tokenBlacklist.service.js";
import { generateOtp, getExpiryTime } from "../utils/generateOtp.js";
import { sendOtpEmail } from "../utils/sendOtpEmail.js";

/**
 * REGISTER USER
 * Creates user (isVerified false), generates OTP, sends email
 */
export const registerUserService = async ({ email, name, password, role }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Check if user already exists
  let user = await User.findOne({ email: normalizedEmail });
  if (user) {
    if (user.isVerified) {
      throw new Error("User already registered and verified");
    }
    // else user exists but not verified → reuse
  } else {
    // Create user
    user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role,
      isVerified: false,
    });
  }

  // Delete previous OTPs for this email
  await Otp.deleteMany({ email: normalizedEmail });

  // Generate OTP
  const otpCode = generateOtp();
  const otp = new Otp({
    email: normalizedEmail,
    otp: otpCode.toString(),
    expiresAt: getExpiryTime(10), // 10 minutes
  });
  await otp.save();

  // // Send OTP email
  await sendOtpEmail(normalizedEmail, otpCode);

  return {
    userId: user._id,
    email: user.email,
    message: "User registered. OTP sent to email.",
  };
};

/**
 * VERIFY OTP
 * Verifies OTP, updates user's isVerified status, generates tokens
 */
export const verifyOtpService = async ({ email, otp }) => {
  if (!email || !otp) throw new Error("Email and OTP are required");

  const normalizedEmail = email.toLowerCase().trim();
  const otpRecord = await Otp.findOne({
    email: normalizedEmail,
    otp: otp.toString(),
  });

  if (!otpRecord) throw new Error("Invalid OTP");
  if (otpRecord.expiresAt < new Date()) throw new Error("OTP expired");

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) throw new Error("User not found");

  // Update verification status
  user.isVerified = true;
  await user.save();

  // Generate tokens after verification
  const accessToken = generateToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });
  user.refreshToken = refreshToken;
  await user.save();

  // Delete all OTPs for this email
  await Otp.deleteMany({ email: normalizedEmail });

  return {
    user,
    accessToken,
    refreshToken,
    message: "OTP verified successfully",
  };
};

/**
 * LOGIN USER
 */
export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  if (!user.isVerified)
    throw new Error("Email not verified. Please verify your email to login.");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

/**
 * REFRESH TOKEN
 */
export const refreshTokenService = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateToken({ id: user._id, role: user.role });
  return { accessToken };
};

/**
 * LOGOUT USER
 */
export const logoutService = async (userId, token) => {
  if (!token) throw new Error("Token missing");

  const decoded = jwt.decode(token);
  const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

  await blacklistToken(token, expiresIn);

  await User.findByIdAndUpdate(userId, { refreshToken: null });

  return true;
};
