import { Response } from 'express';

export function resErr(res: Response, status: number, error: Error | string) {
  if (error instanceof Error)
    return res.status(status).json({
      message: error.message,
    });
  return res.status(status).json({
    message: error,
  });
}
