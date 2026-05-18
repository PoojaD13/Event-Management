import redisClient from "../config/redis.js";

export const blacklistToken = async (
  token,
  expiresIn
) => {
  await redisClient.set(
    `bl_${token}`,
    "blacklisted",
    {
      EX: expiresIn
    }
  );
};

export const isBlacklisted = async (
  token
) => {
  return await redisClient.get(
    `bl_${token}`
  );
};