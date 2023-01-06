import { Request, Response } from 'express';
import { calculatePoints, resErr, resSuccess } from 'utils/utils';
import {
  createShareMoment,
  createTag,
  getShareMomentByIds,
  getShareMomentBySessionId,
  getTaggedMomentIds,
  updateShareMoment,
} from './shm.services';
import { ShareMoment } from 'interfaces/Shm';
import {
  getActiveShmSession,
  getShmSessionById,
} from 'modules/shmSession/shmSession.services';
import { ShareMomentSesssion } from 'interfaces/ShmSession';
import { findUserById, updateUser } from 'modules/user/user.service';

export async function shareMomentController(req: Request, res: Response) {
  try {
    const { title, tags } = req.body;
    const userId = req.context.user.id;
    const sessionId = await getActiveShmSession();

    const files = req.files as Express.Multer.File[];

    // Here I will call shm service to create the shared Moment
    const sharedMoment: ShareMoment = await createShareMoment({
      title,
      sessionId,
      userId,
      picture1: files[0].path,
      picture2: files[1].path,
    });

    //Here I will call tags service to create tags
    if (tags) {
      tags.split(',').forEach(async (tag: string) => {
        await createTag({
          userId: Number(tag),
          shareMomentId: sharedMoment.id,
        });
      });
    }
    // Here I will get the session Created Date to update the user points
    const shmSession: ShareMomentSesssion | null = await getShmSessionById(
      sessionId
    );
    if (!shmSession) throw new Error('Share Moment Session not found');

    // calc points
    const user = await findUserById(userId);
    if (!user) throw new Error('User not found');

    const points: number =
      calculatePoints(shmSession.createdAt, tags?.length || 0) + user.points;

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

export async function updateShareMomentController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, tags } = req.body;

    const shmUpdated = await updateShareMoment(Number(id), { title });

    if (tags) {
      tags.forEach(async (tag: number) => {
        await createTag({
          userId: tag,
          shareMomentId: Number(id),
        });
      });
    }

    resSuccess(res, {
      message: 'Shared Moment updated successfully',
      data: shmUpdated,
    });
  } catch (error) {
    resErr(res, error as Error | string);
  }
}

export async function hasSharedMomentController(req: Request, res: Response) {
  try {
    return resSuccess(res, {
      message: 'User has not shared a moment',
      hasSharedMoment: false,
    });
  } catch (error) {
    resErr(res, error as Error | string);
  }
}

export async function getTaggedMomentsController(req: Request, res: Response) {
  try {
    const userId = req.context.user.id;
    const sessionId = await getActiveShmSession();

    const taggedMomentIds = await getTaggedMomentIds(userId);

    const sharedMoments = await getShareMomentByIds(
      taggedMomentIds.map((id) => id.shareMomentId),
      sessionId
    );

    resSuccess(res, {
      message: 'Tagged Moments fetched successfully',
      data: sharedMoments,
    });
  } catch (error) {
    resErr(res, error as Error | string);
  }
}

export async function getSharedMomentsController(req: Request, res: Response) {
  try {
    const sessionId = await getActiveShmSession();

    const sharedMoments = await getShareMomentBySessionId(sessionId);

    resSuccess(res, {
      message: 'Shared Moments fetched successfully',
      data: sharedMoments,
    });
  } catch (error) {
    resErr(res, error as Error | string);
  }
}
