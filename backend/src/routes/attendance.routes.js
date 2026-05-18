

import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { markAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

/**
 * SCAN QR → ATTENDANCE
 */
router.post("/", authMiddleware, markAttendance);

export default router;
