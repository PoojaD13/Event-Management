import redisClient from "../config/redis.js";

import Event from "../models/Event.js";
import { generateEventQR } from "../utils/qrGenerator.js";
import { generateLocationImage } from "../utils/generateLocationImage.js";

/**
 * CREATE EVENT
 */
// export const createEventService = async (payload) => {
//   const event = await Event.create(payload);

//   // generate QR
//   const qr = await generateEventQR(event._id);

//   event.qrCode = qr.token;
//   await event.save();

//   return {
//     event,
//     qrImage: qr.qrImage,
//   };
// };

export const createEventService = async (payload) => {
  // 1. Create the initial document template in MongoDB
  const event = await Event.create(payload);

  // 2. Generate the dynamic Base64 image payload
  const qr = await generateEventQR(event._id);

  // 3. ✅ FIX: Assign the actual payload key 'qrImage' instead of 'token'
  event.qrCode = qr.qrImage;

  const locImage = await  generateLocationImage(event.coordinates);

  event.locImage = locImage?.qrImage;

  // 4. Save the updated instance document containing the payload
  await event.save();

  return {
    event,
    qrImage: qr.qrImage,
    locImage,
  };
};

/**
 * GET EVENTS (cached)
 */
export const getEventsService = async (query, skip, limit, cacheKey) => {
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const events = await Event.find(query)
    .skip(skip)
    .limit(limit)
    .populate("organizer", "name email");

  const total = await Event.countDocuments(query);

  const result = {
    events,
    total,
  };

  await redisClient.set(cacheKey, JSON.stringify(result), {
    EX: 300,
  });

  return result;
};

/**
 * GET SINGLE EVENT
 */
export const getSingleEventService = async (id, cacheKey) => {
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const event = await Event.findById(id).populate("organizer", "name email");

  await redisClient.set(cacheKey, JSON.stringify(event), {
    EX: 300,
  });

  return event;
};

/**
 * UPDATE EVENT
 */
export const updateEventService = async (id, payload) => {
  const event = await Event.findByIdAndUpdate(id, payload, {
    new: true,
  });

  await clearCacheByPrefix("events:list");
  await redisClient.del(`events:single:${id}`);

  return event;
};

/**
 * DELETE EVENT
 */
export const deleteEventService = async (id) => {
  await Event.findByIdAndDelete(id);

  await clearCacheByPrefix("events:list");
  await redisClient.del(`events:single:${id}`);

  return true;
};

/**
 * CACHE CLEANUP
 */
const clearCacheByPrefix = async (prefix) => {
  const keys = await redisClient.keys(`${prefix}*`);

  if (keys.length) {
    await redisClient.del(keys);
  }
};

export const getMyEventServices = async (id) => {
  const events = await Event.find({ organizer: id });
  return events;
};
