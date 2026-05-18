import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    message: String
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);