import jwt from 'jwt-simple';
import { ENV } from '@config/env';
import { checkUnauthorized } from './http-error.util';

export interface TokenPayload {
  userUuid: string;
  roleName: string;
  iat?: number;
  exp?: number;
}

export function signJwt(payload: TokenPayload, expiresIn?: number): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const tokenPayload: TokenPayload = {
    ...payload,
    iat: timestamp,
    ...(expiresIn ? { exp: timestamp + expiresIn } : {}),
  };
  return jwt.encode(tokenPayload, String(ENV.JWT_SECRET));
}

export function verifyJwt(token: string): TokenPayload {
  const decoded = jwt.decode(token, ENV.JWT_SECRET) as TokenPayload;
  checkUnauthorized(decoded?.userUuid, 'Invalid token');
  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < now) {
    throw new Error('JWT expired');
  }
  return decoded;
}
