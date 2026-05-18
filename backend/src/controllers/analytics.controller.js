import Attendance from "../models/Attendance.js";
import Message from "../models/Message.js";
import Announcement from "../models/Announcement.js";

export const getAnalytics = async (
  req,
  res
) => {
  const eventId = req.params.eventId;

  const totalAttendance =
    await Attendance.countDocuments({
      event: eventId
    });

  const totalMessages =
    await Message.countDocuments({
      eventId
    });

  const totalAnnouncements =
    await Announcement.countDocuments({
      event: eventId
    });

  res.json({
    success: true,
    data: {
      totalAttendance,
      totalMessages,
      totalAnnouncements
    }
  });
};