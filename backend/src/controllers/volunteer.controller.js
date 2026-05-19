import Volunteer from "../models/Volunteer.js";
import Event from "../models/Event.js";

export const createVolunteer = async (req, res) => {
  try {
    const { name, email, phone, role, eventId } = req.body;

    // Validation
    if (!name || !email || !eventId) {
      return res.status(400).json({
        success: false,
        message: "name, email and eventId are required",
      });
    }

    // Check Event
    const eventExists = await Event.findById(eventId);

    if (!eventExists) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Optional duplicate check
    const existingVolunteer = await Volunteer.findOne({
      email,
      event: eventId,
    });

    if (existingVolunteer) {
      return res.status(400).json({
        success: false,
        message: "Volunteer already exists for this event",
      });
    }

    // Create Volunteer
    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      role,
      event: eventId,
    });

    return res.status(201).json({
      success: true,
      message: "Volunteer created successfully",
      data: volunteer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET VOLUNTEERS BY EVENT ID
export const getVolunteersByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check event exists
    const eventExists = await Event.findById(eventId);

    if (!eventExists) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Fetch volunteers
    const volunteers = await Volunteer.find({
      event: eventId,
    }).populate("event");

    return res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role } = req.body;

    const volunteer = await Volunteer.findById(id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    // update fields only if provided
    if (name) volunteer.name = name;
    if (email) volunteer.email = email;
    if (phone) volunteer.phone = phone;
    if (role) volunteer.role = role;

    await volunteer.save();

    return res.status(200).json({
      success: true,
      message: "Volunteer updated successfully",
      data: volunteer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params;

    const volunteer = await Volunteer.findById(id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    await Volunteer.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Volunteer deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};