import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    },

    totalParticipants: {
      type: Number,
      default: 0
    },

    totalMessages: {
      type: Number,
      default: 0
    },

    totalAnnouncements: {
      type: Number,
      default: 0
    },

    totalAttendance: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "EventAnalytics",
  analyticsSchema
);