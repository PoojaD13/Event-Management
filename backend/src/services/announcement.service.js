

import Announcement from "../models/Announcement.js";
import { channel } from "../config/rabbitmq.js";

/**
 * CREATE ANNOUNCEMENT
 */
export const createAnnouncementService = async (payload) => {
  const announcement = await Announcement.create({
    ...payload,
    createdBy: payload.userId,
  });

  // RabbitMQ publish (side effect)
  if (channel) {
    await channel.publishToQueue({
      type: "announcement",
      eventId: payload.event,
      message: payload.message,
    });
  } else {
    console.warn("RabbitMQ not connected, skipping publish");
  }

  return announcement;
};

/**
 * GET ANNOUNCEMENTS
 */
export const getAnnouncementsService = async (eventId) => {
  return Announcement.find({ event: eventId }).sort({
    createdAt: -1,
  });
};
