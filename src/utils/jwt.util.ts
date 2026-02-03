import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenPayload } from '@type/token-payload';

export class JwtUtil {
  private static readonly secret: string = process.env.JWT_SECRET ?? '';

  static initCheck(): void {
    if (!this.secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
  }

  static sign(payload: TokenPayload, expiresIn: string = '7d'): string {
    this.initCheck();
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  static verify(token: string): TokenPayload & JwtPayload {
    this.initCheck();
    try {
      return jwt.verify(token, this.secret) as TokenPayload & JwtPayload;
    } catch (err) {
      console.error('[JwtUtil.verify] Token verification failed:', err);
      throw new Error('Invalid token');
    }
  }
}
