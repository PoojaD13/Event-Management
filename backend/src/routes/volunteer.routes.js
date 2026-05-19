import express from "express";

const router = express.Router();

import {
  createVolunteer,
  getVolunteersByEvent,
} from "../controllers/volunteer.controller.js";

// POST /api/volunteers
router.post("/", createVolunteer);

router.get("/event/:eventId", getVolunteersByEvent);

export default router;
