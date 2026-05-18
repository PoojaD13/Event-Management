
import redisClient from "../config/redis.js";

const cache = (keyPrefix, ttl = 300) => {
  return async (req, res, next) => {
    try {
      const key = `${keyPrefix}:${JSON.stringify({
        query: req.query,
        params: req.params,
      })}`;

      const cached = await redisClient.get(key);

      if (cached) {
        return res.json(JSON.parse(cached));
      }

      const originalJson = res.json.bind(res);

      res.json = (body) => {
        redisClient.set(key, JSON.stringify(body), {
          EX: ttl,
        });

        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Cache error:", err.message);
      next(); // fail-safe: continue without cache
    }
  };
};

export default cache;
