import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Redis Connected");
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

export const connectRedis = async () => {
  try {
    // await redisClient.connect();
    await redisClient.connect();
    console.log("Redis connected ");
  } catch (err) {
    console.log("Redis failed to connect", err.message);
    console.log("server continued without redis ");
  }
};
await redisClient.connect();

export default redisClient;
