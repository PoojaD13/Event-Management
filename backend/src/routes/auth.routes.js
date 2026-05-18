
import express from "express";

import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */
router.post("/register", register);
router.post("/login", login);

/**
 * PROTECTED ROUTES
 */
router.post("/refresh", authMiddleware, refreshToken);
router.post("/logout", authMiddleware, logout);

export default router;
