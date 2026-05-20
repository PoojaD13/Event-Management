import Redis from "ioredis";

export const redisConnection = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
 

  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});
