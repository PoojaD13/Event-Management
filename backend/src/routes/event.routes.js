// // import express from "express";

// // import authMiddleware from "../middlewares/auth.middleware.js";
// // import authorizeRoles from "../middlewares/role.middleware.js";

// // import {
// //   createEvent,
// //   getEvents,
// //   getSingleEvent
// // } from "../controllers/event.controller.js";

// // const router = express.Router();

// // router.post(
// //   "/",
// //   authMiddleware,
// //   authorizeRoles("admin", "organizer"),
// //   createEvent
// // );

// // router.get("/", getEvents);

// // router.get("/:id", getSingleEvent);

// // export default router;

// import express from "express";

// import authMiddleware from "../middlewares/auth.middleware.js";

// import authorizeRoles from "../middlewares/role.middleware.js";

// import {
//   createEvent,
//   getEvents,
//   getSingleEvent,
//   updateEvent,
//   deleteEvent,
// } from "../controllers/event.controller.js";

// const router = express.Router();

// router.post(
//   "/",
//   authMiddleware,
//   authorizeRoles("admin", "organizer"),
//   createEvent,
// );

// // router.get("/", getEvents);

// import cache from "../middlewares/cache.middleware.js";

// router.get("/", cache("events_"), getEvents);

// router.get("/:id", getSingleEvent);

// router.put(
//   "/:id",
//   authMiddleware,
//   authorizeRoles("admin", "organizer"),
//   updateEvent,
// );

// router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteEvent);

// export default router;

import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import cache from "../middlewares/cache.middleware.js";

import {
  createEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
} from "../controllers/event.controller.js";

const router = express.Router();

/**
 * CREATE EVENT
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "organizer"),
  createEvent,
);

/**
 * GET ALL EVENTS (cached)
 */
router.get("/", 
  // cache("events:list"),
   getEvents);

router.get(
  "/organizer/my",
  authMiddleware,
  authorizeRoles("admin", "organizer"),
  getMyEvents,
);

/**
 * GET SINGLE EVENT (cached optional)
 */
router.get("/:id", 
  // cache("event_"), 
  getSingleEvent);

/**
 * UPDATE EVENT
 */
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "organizer"),
  updateEvent,
);

/**
 * DELETE EVENT (admin only)
 */
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "organizer"),
  deleteEvent,
);

export default router;
