import { Request, Response, NextFunction } from 'express';
import { TokenPayload, verifyJwt } from '@utils/jwt.util';
import { checkNotFound, checkUnauthorized } from '@utils/http-error.util';
import { UserService } from '@modules/user/services/user.service';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const payload = token ? verifyJwt(token) : null;
    checkUnauthorized(payload, 'Invalid token');
    const user = await UserService.findUnique({ uuid: payload.userUuid });
    checkNotFound(user, 'User not found');
    type RequestWithUser = Request & { user?: TokenPayload };
    (req as RequestWithUser).user = payload;
    next();
  } catch (error) {
    next(error);
  }
}
