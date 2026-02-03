import { Request, Response, NextFunction } from 'express';
import { HttpError, isHttpError } from 'http-errors';

export function errorHandler(
  err: HttpError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const isDev = process.env.NODE_ENV !== 'production';

  const status = isHttpError(err) ? err.status || (err as any).statusCode || 500 : 500;

  const message = isDev ? err.message : 'Internal Server Error';

  if (isDev) {
    console.error('[ErrorHandler]', err);
  }

  res.status(status).json({
    error: {
      status,
      message,
      ...(isDev && { stack: err.stack }),
    },
  });
}
