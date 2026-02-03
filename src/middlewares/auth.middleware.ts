import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '@utils/jwt.util';
import { TokenPayload } from '@type/token-payload';

export async function verifyHttpJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded: TokenPayload = JwtUtil.verify(token);

    type RequestWithUser = Request & { user?: TokenPayload };
    (req as RequestWithUser).user = decoded;
    next();
  } catch (err) {
    console.error('[verifyHttpJWT] Token verification failed:', err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}
