import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import { getChatHistory } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/:eventId", authMiddleware, getChatHistory);

export default router;
