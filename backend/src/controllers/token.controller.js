import jwt from "jsonwebtoken";

import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";

export const refreshToken = async (
  req,
  res
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token required"
    });
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET
  );

  const user = await User.findById(
    decoded.id
  );

  if (
    !user ||
    user.refreshToken !== refreshToken
  ) {
    return res.status(403).json({
      success: false,
      message: "Invalid refresh token"
    });
  }

  const accessToken = generateToken({
    id: user._id,
    role: user.role
  });

  res.json({
    success: true,
    data: {
      accessToken
    }
  });
};