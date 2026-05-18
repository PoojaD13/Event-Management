

import Attendance from "../models/Attendance.js";

/**
 * MARK ATTENDANCE USING QR (SIMPLE VERSION)
 */
export const markAttendanceService = async (userId, eventId) => {
  try {
    const attendance = await Attendance.create({
      user: userId,
      event: eventId,
    });

    return attendance;
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("Already marked attendance");
    }

    throw err;
  }
};
