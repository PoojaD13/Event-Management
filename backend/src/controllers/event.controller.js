import {
  createEventService,
  getEventsService,
  getSingleEventService,
  updateEventService,
  deleteEventService,
  getMyEventServices,
} from "../services/event.service.js";

/**
 * CREATE EVENT
 */
export const createEvent = async (req, res) => {
  try {
    const event = await createEventService(req.body);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * GET EVENTS
 */
export const getEvents = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const query = {
      title: {
        $regex: search,
        $options: "i",
      },
    };

    const cacheKey = `events:list:${JSON.stringify(req.query)}`;

    const data = await getEventsService(query, skip, limit, cacheKey);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * GET SINGLE EVENT
 */
export const getSingleEvent = async (req, res) => {
  try {
    const cacheKey = `events:single:${req.params.id}`;

    const event = await getSingleEventService(req.params.id, cacheKey);

    res.json({
      success: true,
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * UPDATE EVENT
 */
export const updateEvent = async (req, res) => {
  try {
    const event = await updateEventService(req.params.id, req.body);

    res.json({
      success: true,
      message: "Event updated",
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * DELETE EVENT
 */
export const deleteEvent = async (req, res) => {
  try {
    await deleteEventService(req.params.id);

    res.json({
      success: true,
      message: "Event deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await getMyEventServices(userId);

    res.status(200).json({
      success: true,
      data: {
        events,
        total: events.length,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
