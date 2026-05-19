import Participant from "../models/participant.model.js";
import Event from "../models/Event.js";
import sendEmail from "../utils/sendEmail.js";

// REGISTER USER FOR EVENT
export const registerParticipant = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id; // from auth middleware

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    // check duplicate
    const existing = await Participant.findOne({ eventId, userId });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already registered for this event",
      });
    }

    const participant = await Participant.create({
      eventId,
      userId,
    });

    await sendEmail({
      to: participant.email,

      subject: `Registration Confirmed - ${event.title}`,

      html: `
    <h2>Hello ${participant.name}</h2>

    <p>Your registration has been confirmed.</p>

    <h3>Event Details</h3>

    <p><strong>Event:</strong> ${event.title}</p>
    <p><strong>Date:</strong> ${event.date}</p>
    <p><strong>Location:</strong> ${event.location}</p>

    <br/>

    <p>See you at the event 🚀</p>
  `,
    });

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: participant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET participants for an event
export const getParticipantsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    const eventInfo = await Event.findById(eventId).populate("organizer");
    console.log(eventInfo.organizer._id, userId);
    if (String(eventInfo.organizer._id) !== String(userId)) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const participants = await Participant.find({ eventId })
      .populate("userId", "name email role")
      .populate("eventId", "title date");

    return res.status(200).json({
      success: true,
      data: participants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
