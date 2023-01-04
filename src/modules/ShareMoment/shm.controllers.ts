import { ShareMomentSession } from '@prisma/client';
import { Request, Response } from 'express';
import { resErr } from 'utils/utils';
import { createShmSession } from './shm.services';

export async function createShmController(req: Request, res: Response) {
  try {
    const shmSession: ShareMomentSession = await createShmSession({
      sessionName: req.body.sessionName,
      acitve: req.body.acitve,
    });
    if (!shmSession) throw new Error("Couldn't Create Share MomentSession");
    res.status(200).json({
      shmSession,
    });
  } catch (error) {
    return resErr(res, 400, error as Error | string);
  }
}

export async function updateShmController(req: Request, res: Response) {
  try {
    const shmSession: ShareMomentSession = await createShmSession({
      sessionName: req.body.sessionName,
      acitve: req.body.acitve,
    });
    if (!shmSession) throw new Error("Couldn't Create Share MomentSession");
    res.status(200).json({
      shmSession,
    });
  } catch (error) {
    return resErr(res, 400, error as Error | string);
  }
}
