import { AuthRedis } from '../auth.redis';

export class AuthService {
  static async setTokenToRedis(userUuid: string, token: string) {
    await AuthRedis.setToken(userUuid, token);
  }

  static async getTokenFromRedis(userUuid: string) {
    const token = await AuthRedis.getToken(userUuid);
    return token || null;
  }

  static async removeTokenToRedis(userUuid: string) {
    await AuthRedis.removeToken(userUuid);
  }
}
