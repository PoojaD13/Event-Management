import express from "express";

import authRoutes from "./auth.routes.js";
import eventRoutes from "./event.routes.js";
import chatRoutes from "./chat.routes.js";
import announcementRoutes from "./announcement.routes.js";
import attendanceRoutes from "./attendance.routes.js";

import otpRoutes from "./otp.routes.js";

import dashboardRoutes from "./dashboard.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/events", eventRoutes);

router.use("/chat", chatRoutes);

router.use("/announcements", announcementRoutes);

router.use("/otp", otpRoutes);
router.use("/attendance", attendanceRoutes);

router.use("/dashboard", dashboardRoutes);

export default router;
