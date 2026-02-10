import { HttpError } from '@utils/http-error.util';
import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';

const pgErrorMap: Record<string, { status: number; message: string }> = {
  '23505': { status: 409, message: 'Unique欄位資料重複' },
  '23502': { status: 400, message: '缺少必要欄位' },
  '23503': { status: 400, message: '外鍵關聯錯誤，相關資料不存在' },
  '42703': { status: 500, message: '資料欄位不存在，請聯絡開發人員' },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.error(`[ERROR] ${err instanceof Error ? err.message : 'Unknown error'}`, err);

  if (err instanceof HttpError) {
    res.status(err.status).json({
      success: false,
      message: err.message,
    });
  } else if (err instanceof QueryFailedError && 'code' in err) {
    const pgErr = err as QueryFailedError & { code: string };
    const mapped = pgErrorMap[pgErr.code];
    res.status(mapped?.status ?? 500).json({
      success: false,
      message: mapped?.message ?? `資料庫錯誤代碼：${pgErr.code}`,
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}
