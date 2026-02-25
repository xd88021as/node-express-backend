import redis from '@redis/redis-client';

const getTokenKey = (userUuid: string) => `user:${userUuid}:token`;

export class AuthRedis {
  static async setToken(userUuid: string, token: string, ttlSeconds = 15 * 60) {
    const key = getTokenKey(userUuid);
    console.log(`redis key: ${key}, valud: ${token}`);
    await redis.set(key, token, 'EX', ttlSeconds);
  }

  static async getToken(userUuid: string) {
    const value = await redis.get(getTokenKey(userUuid));
    return value;
  }

  static async removeToken(userUuid: string) {
    const key = getTokenKey(userUuid);
    await redis.del(key);
  }
}
