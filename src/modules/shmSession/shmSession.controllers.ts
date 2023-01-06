import { ShareMomentSession } from '@prisma/client';
import { Request, Response } from 'express';
import { resErr, resSuccess } from 'utils/utils';
import { createShmSession, updateShmSession } from './shmSession.services';

export async function createShmSessionController(req: Request, res: Response) {
  try {
    const shmSession: ShareMomentSession = await createShmSession({
      sessionName: req.body.sessionName,
      active: req.body.active,
    });
    if (!shmSession) throw new Error("Couldn't Create Share MomentSession");

    resSuccess(res, {
      message: 'Share You moment Session has been Created',
      shmSession,
    });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}

export async function updateShmSessionController(req: Request, res: Response) {
  try {
    const shmSession: ShareMomentSession = await updateShmSession(
      Number(req.params.id),
      {
        sessionName: req.body.sessionName,
        active: req.body.active,
      }
    );
    if (!shmSession) throw new Error("Couldn't Create Share MomentSession");

    resSuccess(res, {
      message: "Share You moment Session has been Updated'",
      shmSession,
    });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}
