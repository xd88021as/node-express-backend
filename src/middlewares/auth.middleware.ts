import { Request, Response, NextFunction } from 'express';
import { TokenPayload, verifyJwt } from '@utils/jwt.util';
import { checkForbidden, checkNotFound, checkUnauthorized } from '@utils/http-error.util';
import { UserService } from '@modules/user/services/user.service';

type RequestWithUser = Request & { user?: TokenPayload };

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const payload = token ? verifyJwt(token) : null;
    checkUnauthorized(payload, 'Invalid token');
    const user = await UserService.findUnique({ uuid: payload.userUuid });
    checkNotFound(user, 'User not found');
    (req as RequestWithUser).user = payload;
    next();
  } catch (error) {
    next(error);
  }
}

export function requireOwnershipOrRole(options: { roles?: string[]; allowSelf?: boolean }) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as RequestWithUser).user;
    checkUnauthorized(user);
    const hasRole = options.roles && options.roles.includes(user.roleName);
    const isSelf = options.allowSelf && user.userUuid === req.params.uuid;
    checkForbidden(hasRole || isSelf);
    next();
  };
}
