import { AxiosError } from 'axios';

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export function checkNotFound(value: unknown, message = 'Not Found'): asserts value {
  if (!value) {
    throw new HttpError(404, message);
  }
}

export function checkUnauthorized(value: unknown, message = 'Unauthorized'): asserts value {
  if (!value) {
    throw new HttpError(401, message);
  }
}

export function checkForbidden(value: unknown, message = 'Forbidden'): asserts value {
  if (!value) {
    throw new HttpError(403, message);
  }
}

export function wrapThirdPartyError(err: unknown, label: string, fallbackStatus = 502): never {
  const error = err as AxiosError;
  const status = error.response?.status || fallbackStatus;
  const message =
    (error.response?.data as any)?.message ||
    (error.response?.data as any)?.error ||
    error.message ||
    'Unknown Error';
  throw new HttpError(status, `[${label}] ${message}`);
}
