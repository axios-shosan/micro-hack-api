import { getActiveShmSession } from 'modules/shmSession/shmSession.services';
import { hasSharedMoment } from './shm.services';
import { Request, Response, NextFunction } from 'express';
import { resErr } from 'utils/utils';

export async function hasSharedMomentMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await getActiveShmSession();

    const hasShared = await hasSharedMoment(session.id, req.context.user.id);

    if (hasShared) return resErr(res, 'User has Already shared a moment');

    return next();
  } catch (error) {
    resErr(res, error as Error | string);
  }
}

export async function hasntSharedMomentMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await getActiveShmSession();

    const hasShared = await hasSharedMoment(session.id, req.context.user.id);

    if (!hasShared) return resErr(res, "User Didn't shared a moment");

    return next();
  } catch (error) {
    resErr(res, error as Error | string);
  }
}
