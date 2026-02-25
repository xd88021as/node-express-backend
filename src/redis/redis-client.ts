import { Redis } from '@upstash/redis';
import { ENV } from '@config/env';

const redis = new Redis({
  url: ENV.REDIS_URL,
  token: ENV.REDIS_TOKEN,
});

export default redis;
