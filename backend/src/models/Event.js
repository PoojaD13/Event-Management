import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    date: Date,

    startTime: String,

    endTime: String,

    building: String,

    floor: String,

    roomNumber: String,

    coordinates: {
      lat: Number,
      lng: Number,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    qrCode: { type: String },
    locImage: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Event", eventSchema);
