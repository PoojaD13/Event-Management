// import Announcement from "../models/Announcement.js";
// import { channel } from "../config/rabbitmq.js";

// export const createAnnouncement = async (req, res) => {
//   const announcement = await Announcement.create({
//     ...req.body,
//     postedBy: req.user.id,
//   });

//   if (!channel) {
//     console.warn("RabbitMQ not connected, skipping publish");
//   } else {
//     await channel.publishToQueue({
//       type: "announcement",
//       eventId: req.body.event,
//       message: req.body.message,
//     });
//   }

//   res.status(201).json({
//     success: true,
//     message: "Announcement created",
//     data: announcement,
//   });
// };

// export const getAnnouncements = async (req, res) => {
//   const announcements = await Announcement.find({
//     event: req.params.eventId,
//   });

//   res.json({
//     success: true,
//     data: announcements,
//   });
// };

import {
  createAnnouncementService,
  getAnnouncementsService,
} from "../services/announcement.service.js";

/**
 * CREATE ANNOUNCEMENT
 */
export const createAnnouncement = async (req, res) => {
  try {
    const userId = req.user.id;

    const announcement = await createAnnouncementService({
      ...req.body,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Announcement created",
      data: announcement,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * GET ANNOUNCEMENTS
 */
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await getAnnouncementsService(req.params.eventId);
    res.json({
      success: true,
      data: announcements,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
