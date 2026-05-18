
import jwt from "jsonwebtoken";

import { isBlacklisted } from "../services/tokenBlacklist.service.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const blacklisted = await isBlacklisted(token);

    if (blacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token blacklisted",
      });
    }
  //  console.log("JWT_SECRET IN MIDDLEWARE:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
