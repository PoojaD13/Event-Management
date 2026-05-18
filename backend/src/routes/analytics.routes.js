import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import { getAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get(
  "/:eventId",
  authMiddleware,
  getAnalytics
);

export default router;