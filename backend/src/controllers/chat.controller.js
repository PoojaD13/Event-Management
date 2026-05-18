
import {
  getChatHistoryService,
  sendMessageService,
} from "../services/chat.service.js";

/**
 * GET CHAT HISTORY
 */
export const getChatHistory = async (req, res) => {
  try {
    const { eventId } = req.params;

    const messages = await getChatHistoryService(eventId);

    res.json({
      success: true,
      data: messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
