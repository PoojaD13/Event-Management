
import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

import {
  createAnnouncement,
  getAnnouncements,
} from "../controllers/announcement.controller.js";

const router = express.Router();

/**
 * CREATE ANNOUNCEMENT (ADMIN / ORGANIZER ONLY)
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "organizer"),
  createAnnouncement,
);

/**
 * GET ANNOUNCEMENTS FOR EVENT (AUTH REQUIRED)
 */
router.get("/event/:eventId", authMiddleware, getAnnouncements);

export default router;
