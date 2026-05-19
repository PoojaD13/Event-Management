import express from "express";

const router = express.Router();

import {
  createVolunteer,
  getVolunteersByEvent,
} from "../controllers/volunteer.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

// POST /api/volunteers
router.post("/", authMiddleware, authorizeRoles("organizer"), createVolunteer);

router.get(
  "/event/:eventId",
  authMiddleware,
  authorizeRoles("organizer"),
  getVolunteersByEvent,
);

export default router;
