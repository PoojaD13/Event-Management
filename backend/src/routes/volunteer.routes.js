import express from "express";

const router = express.Router();

import {
  createVolunteer,
  getVolunteersByEvent,
  updateVolunteer,
  deleteVolunteer,
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

// NEW ✨
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("organizer"),
  updateVolunteer,
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("organizer"),
  deleteVolunteer,
);

export default router;
