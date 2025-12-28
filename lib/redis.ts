import Redis from "ioredis";

let redisClient: Redis | null = null;

if (!redisClient) {
  const url = process.env.REDIS_URL;
  if (!url) {
    console.warn("REDIS_URL is not set; caching disabled.");
  } else {
    redisClient = new Redis(url);
  }
}

export default redisClient!;
