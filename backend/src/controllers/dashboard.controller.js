// import Event from "../models/Event.model.js";
// import User from "../models/User.model.js";

import Event from "../models/Event.js";
import User from "../models/User.js";

export const getDashboardData = async (req, res) => {
  try {
    const { role, _id: userId } = req.user;
    let stats = {};
    let recentEvents = [];

    if (role === "admin") {
      stats = {
        totalUsers: await User.countDocuments(),
        totalEvents: await Event.countDocuments(),
        activeChats: 18, 
        engagement: "92%"
      };
      recentEvents = await Event.find().sort({ createdAt: -1 }).limit(3);
    } else if (role === "organizer") {
      stats = {
        totalEvents: await Event.countDocuments({ organizer: userId }),
        participants: 320, 
        announcements: 12,
        engagement: "85%"
      };
      recentEvents = await Event.find({ organizer: userId }).sort({ createdAt: -1 }).limit(3);
    }

    res.status(200).json({ success: true, data: { stats, recentEvents } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
