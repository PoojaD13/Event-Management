
import Message from "../models/Message.js";

/**
 * GET CHAT HISTORY
 */
export const getChatHistoryService = async (eventId) => {
  return Message.find({ eventId })
    .populate("sender", "name email")
    .sort({ createdAt: 1 });
};

/**
 * SEND MESSAGE
 */
export const sendMessageService = async (payload) => {
  const message = await Message.create(payload);

  return Message.findById(message._id).populate(
    "sender",
    "name email"
  );
};