// import express from "express";
// import { getDashboardData } from "../controllers/dashboard.controller.js";
// // import { verifyToken } from "../middleware/auth.middleware.js"; // 👈 Use your actual auth middleware name
// import authMiddleware from "../middlewares/auth.middleware.js";

// const router = express.Router();

// // GET /api/dashboard - Protected by your authentication gate
// router.get("/", authMiddleware, getDashboardData);

// export default router;


import express from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";
// import authMiddleware from "../middleware/auth.middleware.js"; // 👈 Default import 1
// import authorizeRoles from "../middleware/role.middleware.js"; // 👈 Default import 2

import authMiddleware from '../middlewares/auth.middleware.js';
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

// Apply both middlewares in sequence to secure the dashboard API
router.get(
  "/", 
  authMiddleware, 
  authorizeRoles("admin", "organizer", "participant"), 
  getDashboardData
);

export default router;
