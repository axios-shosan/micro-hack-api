import { Request, Response } from 'express';
import {
  findAllCheckIn,
  createCheckIn,
  updateCheckIn,
  deleteCheckIn,
  findCheckInUserByIds,
  createCheckInUser,
} from './checkIn.services';
import { resErr, resSuccess } from 'utils/utils';
import { CheckIn, CheckInUser } from '@prisma/client';
import { User } from 'interfaces/User';
import { findUserById } from 'modules/user/user.service';

export async function getAllCheckInController(req: Request, res: Response) {
  try {
    const checkIns: CheckIn[] = await findAllCheckIn();

    resSuccess(res, {
      message: 'success',
      checkIns,
    });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}

export async function createCheckInController(req: Request, res: Response) {
  try {
    const checkIn: CheckIn = await createCheckIn({
      sessionName: req.body.sessionName,
    });

    if (!checkIn) throw new Error("Couldn't Create CheckIn Session");

    resSuccess(res, {
      message: 'success',
      checkIn,
    });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}
export async function updateCheckInController(req: Request, res: Response) {
  try {
    const checkIn: CheckIn = await updateCheckIn(parseInt(req.params.id), {
      sessionName: req.body.sessionName,
    });
    if (!checkIn) throw new Error("Couldn't Create CheckIn Session");

    resSuccess(res, {
      message: 'success',
      checkIn,
    });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}
export async function deleteCheckInController(req: Request, res: Response) {
  try {
    await deleteCheckIn(parseInt(req.params.id));

    resSuccess(res, {
      message: 'success',
    });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}
export async function scanUserController(req: Request, res: Response) {
  try {
    const hasCheckedIn: CheckInUser[] = await findCheckInUserByIds(
      parseInt(req.body.checkInId),
      req.body.userCheckInId
    );
    if (hasCheckedIn.length !== 0)
      throw new Error('User Has Already Checked In');

    const checkUser: CheckInUser = await createCheckInUser({
      userCheckInId: req.body.userCheckInId,
      checkInId: req.body.checkInId,
    });

    resSuccess(res, {
      message: 'User Has Been Checked In',
      checkUser,
    });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}

export async function getCheckInIdController(req: Request, res: Response) {
  try {
    const user: User | null = await findUserById(req.context.user.id);
    if (!user) throw new Error("Can't Find user");

    resSuccess(res, {
      checkInId: user.checkInId,
    });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}
