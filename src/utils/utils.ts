import { Response } from 'express';

export function resErr(res: Response, error: Error | string, status = 400) {
  if (error instanceof Error)
    return res.status(status).json({
      message: error.message,
    });
  return res.status(status).json({
    message: error,
  });
}

export function resSuccess(res: Response, data: unknown, status = 200) {
  return res.status(status).json(data);
}

//calculating points will be based on the session created date and the number of tagged User
//the more the number of tagged users the more the points
//the more the time the less the points
//the range of points is from 1 to 1000
export function calculatePoints(sessionCreatedDate: Date, taggedUsers: number) {
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - sessionCreatedDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const points = Math.floor((1000 / diffDays) * taggedUsers);
  return points;
}
