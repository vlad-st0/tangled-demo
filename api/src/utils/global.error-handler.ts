import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.status ?? 500).send({ message: err.message });
};
