import redisClient from "../config/redis.js";

/**
 * DELETE CACHE BY PREFIX
 * (safe way using scan instead of KEYS)
 */
export const deleteCacheByPrefix = async (prefix) => {
  try {
    const stream = redisClient.scanStream({
      match: `${prefix}*`,
    });

    stream.on("data", (keys) => {
      if (keys.length) {
        const pipeline = redisClient.pipeline();
        keys.forEach((key) => pipeline.del(key));
        pipeline.exec();
      }
    });

    stream.on("end", () => {
      console.log(`Cache cleared for prefix: ${prefix}`);
    });
  } catch (err) {
    console.error("Cache delete error:", err.message);
  }
};
