import type { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  playerId: string;
  role: string;
}
