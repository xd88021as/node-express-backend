import { Request, Response, NextFunction } from 'express';
import { TokenPayload, verifyJwt } from '@utils/jwt.util';
import { checkForbidden, checkNotFound, checkUnauthorized } from '@utils/http-error.util';
import { UserService } from '@modules/user/services/user.service';
import { AuthService } from '@modules/auth/services/auth.service';

export type RequestWithUser = Request & { user?: TokenPayload };
const REFRESH_THRESHOLD_SECONDS = 2 * 60;

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const payload = token ? verifyJwt(token) : null;
    checkUnauthorized(payload, 'Invalid token');

    const redisToken = await AuthService.getTokenFromRedis(payload.userUuid);
    checkUnauthorized(redisToken && redisToken === token, 'Session expired, please sign in again');

    const user = await UserService.findUnique({ uuid: payload.userUuid });
    checkNotFound(user, 'User not found');

    const currentPayload: TokenPayload = { userUuid: user.uuid, roleName: user.role.name };
    const nowSeconds = Math.floor(Date.now() / 1000);
    const remainingSeconds = (payload.exp ?? 0) - nowSeconds;
    const shouldRefresh = remainingSeconds > 0 && remainingSeconds <= REFRESH_THRESHOLD_SECONDS;

    if (shouldRefresh) {
      const refreshedToken = await AuthService.issueToken(currentPayload);
      res.setHeader('Authorization', `Bearer ${refreshedToken}`);
      res.setHeader('X-Access-Token', refreshedToken);
    }

    (req as RequestWithUser).user = currentPayload;
    next();
  } catch (error) {
    next(error);
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const user = (req as RequestWithUser).user;
  checkUnauthorized(user);
  checkForbidden(user.roleName === 'admin');
  next();
}

export function requireAdminOrSelf(req: Request, _res: Response, next: NextFunction) {
  const user = (req as RequestWithUser).user;
  checkUnauthorized(user);

  if (user.roleName === 'admin') {
    next();
    return;
  }

  const userUuid = req.params.userUuid || req.body.userUuid;
  checkForbidden(user.userUuid === userUuid);
  next();
}
