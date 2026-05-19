import express from "express";
import {
  registerParticipant,
  getParticipantsByEvent,
} from "../controllers/participant.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

// REGISTER EVENT
router.post("/register", authMiddleware, registerParticipant);

// GET EVENT PARTICIPANTS
router.get(
  "/:eventId",
  authMiddleware,
  authorizeRoles("organizer"),
  getParticipantsByEvent,
);

export default router;
