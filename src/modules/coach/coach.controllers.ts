import { Request, Response } from 'express';
import {
  createCoach,
  createRequestCoach,
  deleteCoach,
  getActiveCoahces,
  getAllCoaches,
  getCoachById,
  updateCoach,
  updateRequestCoach,
} from './coach.services';
import { resErr, resSuccess } from 'utils/utils';
import { Coach, RequestCoach, RequestStatus } from 'interfaces/Coach';

export async function createCoachController(req: Request, res: Response) {
  //receive the basic infos of a coach
  try {
    const { name } = req.body;

    //the path to coach's picture
    const files = req.files as Express.Multer.File[];
    //store the coach into db
    const coach = createCoach({
      name,
      picture: files[0].path,
    });

    if (!coach) throw new Error('Coach was not created');

    resSuccess(res, { coach, message: 'Coach Created Successfully' });
  } catch (error) {
    resErr(res, error as Error);
  }
}

export async function updateCoachController(req: Request, res: Response) {
  //Get Coach Id
  //Get the data to change
  //Update the Coach into db
  try {
    const coach: Coach = await updateCoach(Number(req.params.id), req.body);
    if (!coach) throw new Error("Can't Update Coach");

    resSuccess(res, { coach, message: 'Coach Updated Successfully' });
  } catch (error) {
    resErr(res, error as Error);
  }
}

export async function deleteCoachController(req: Request, res: Response) {
  try {
    await deleteCoach(Number(req.params.id));
  } catch (error) {
    resErr(res, error as Error);
  }
}

export async function getAllCoachesController(req: Request, res: Response) {
  try {
    const coaches: Coach[] = await getAllCoaches();
    resSuccess(res, { coaches });
  } catch (error) {
    resErr(res, error as Error);
  }
}

export async function getActiveCoachesController(req: Request, res: Response) {
  try {
    const coaches: Coach[] = await getActiveCoahces();
    resSuccess(res, { coaches });
  } catch (error) {
    resErr(res, error as Error);
  }
}

export async function createRequestCoachController(req: Request, res: Response) {
  try {
    const teamId = req.context.user.teamId;
    const coachId = req.body.coachId;

    const coach: Coach | null = await getCoachById(coachId);

    if (!coach) throw new Error('wrong data');

    if (!coach.active) throw new Error('Coach is not active');

    const request: RequestCoach = await createRequestCoach({
      coachId,
      teamId,
    });
    if (!request) throw new Error('Request has not been submitted');

    resSuccess(res, { message: 'Request has been submitted', request });
  } catch (error) {
    resErr(res, error as Error);
  }
}

export async function cancelRequestCoachContoller(req: Request, res: Response) {
  try {
    const request = await updateRequestCoach(Number(req.params.id), {
      status: RequestStatus.canceled,
    });
    if (!request) throw new Error('request has not been updated');
    resSuccess(res, { message: 'Request has been updated', request });
  } catch (error) {
    resErr(res, error as Error);
  }
}

export async function updateRequestCoachContoller(req: Request, res: Response) {
  try {
    const request = await updateRequestCoach(Number(req.params.id), req.body);
    if (!request) throw new Error('request has not been updated');
    resSuccess(res, { message: 'Request has been updated', request });
  } catch (error) {
    resErr(res, error as Error);
  }
}
