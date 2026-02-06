import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let cached: Ratelimit | null = null;

export function getRateLimit() {
  if (cached) return cached;

  const hasUpstashEnv =
    Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
    Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

  if (!hasUpstashEnv) return null;

  const redis = Redis.fromEnv();
  cached = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "zkac",
  });

  return cached;
}
