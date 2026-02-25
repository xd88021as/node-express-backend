import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { ENV } from '@config/env';
import { checkUnauthorized } from './http-error.util';

export interface TokenPayload extends JwtPayload {
  userUuid: string;
  roleName: string;
}

export function signJwt(payload: TokenPayload, expiresIn: SignOptions['expiresIn']): string {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn });
}

export function verifyJwt(token: string): TokenPayload {
  try {
    return jwt.verify(token, ENV.JWT_SECRET) as TokenPayload & JwtPayload;
  } catch (err) {
    console.error('[JwtUtil.verify] Token verification failed:', err);
    checkUnauthorized(false, 'Invalid token');
  }
}
