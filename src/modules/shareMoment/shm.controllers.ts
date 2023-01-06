import { Request, Response } from 'express';
import { calculatePoints, resErr, resSuccess } from 'utils/utils';
import { createShareMoment, createTag } from './shm.services';
import { Shm } from 'interfaces/Shm';
import { getShmSessionById } from 'modules/shmSession/shmSession.services';
import { ShareMomentSesssion } from 'interfaces/ShmSession';
import { updateUser } from 'modules/user/user.service';

export async function shareMomentController(req: Request, res: Response) {
  try {
    const { sessionId, title, tags } = req.body;
    const userId = req.context.user.id;

    const files = req.files as Express.Multer.File[];

    // Here I will call shm service to create the shared Moment
    const sharedMoment: Shm = await createShareMoment({
      title,
      userId: userId,
      sessionId: Number(sessionId),
      picture1: files[0].path,
      picture2: files[1].path,
    });

    //Here I will call tags service to create tags
    if (tags) {
      tags.forEach(async (tag: number) => {
        await createTag({
          userId: tag,
          shareMomentId: sharedMoment.id,
        });
      });
    }
    // Here I will get the session Created Date to update the user points
    const shmSession: ShareMomentSesssion | null = await getShmSessionById(
      Number(sessionId)
    );
    if (!shmSession) throw new Error('Session not found');

    // calc points
    const points: number = calculatePoints(
      shmSession.createdAt,
      tags?.length || 0
    );

    // Here I will add points to the user
    updateUser(userId, { points });

    resSuccess(res, {
      message: 'Shared Moment created successfully',
      data: sharedMoment,
    });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}
