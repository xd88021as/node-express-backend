import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export function validateDTO<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(dtoClass, { ...req.body, ...req.params, ...req.query });

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      res.status(400).json({ errors: errors.map((e) => e.constraints) });
      return;
    }

    req.body = dtoInstance;
    next();
  };
}
