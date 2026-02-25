import { AuthRedis } from '../auth.redis';
import { TokenPayload, signJwt } from '@utils/jwt.util';

export class AuthService {
  private static readonly TOKEN_TTL_SECONDS = 15 * 60;
  private static readonly TOKEN_EXPIRES_IN = '15m';

  static async setTokenToRedis(userUuid: string, token: string) {
    await AuthRedis.setToken(userUuid, token, this.TOKEN_TTL_SECONDS);
  }

  static async getTokenFromRedis(userUuid: string) {
    const token = await AuthRedis.getToken(userUuid);
    return token || null;
  }

  static async removeTokenToRedis(userUuid: string) {
    await AuthRedis.removeToken(userUuid);
  }

  static async issueToken(payload: TokenPayload): Promise<string> {
    const token = signJwt(payload, this.TOKEN_EXPIRES_IN);
    await this.setTokenToRedis(payload.userUuid, token);
    return token;
  }
}
