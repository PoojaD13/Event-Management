import jwt from "jsonwebtoken";

import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

import { blacklistToken } from "./tokenBlacklist.service.js";

/**
 * REGISTER USER
 */
export const registerUserService = async (data) => {
  const user = await User.create(data);

  const accessToken = generateToken({
    id: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

/**
 * LOGIN USER
 */
export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken({
    id: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
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

  const accessToken = generateToken({
    id: user._id,
    role: user.role,
  });

  return {
    accessToken,
  };
};

/**
 * LOGOUT USER
 */
export const logoutService = async (userId, token) => {
  if (!token) {
    throw new Error("Token missing");
  }

  const decoded = jwt.decode(token);

  const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

  await blacklistToken(token, expiresIn);

  await User.findByIdAndUpdate(userId, {
    refreshToken: null,
  });

  return true;
};
