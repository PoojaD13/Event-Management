import api from "./api/axios";

// CREATE EVENT
export const createEvent = async (data) => {
  const res = await api.post("/events", data);
  return res.data;
};

// GET ALL EVENTS
export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

// GET SINGLE EVENT
export const getEventById = async (id) => {
  const res = await api.get(`/events/${id}`);
  return res.data;
};