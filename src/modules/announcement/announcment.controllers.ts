import { Request, Response } from 'express';

import { resErr, resSuccess } from 'utils/utils';
import {
  createAnnouncement,
  delteAnnouncement,
  getAllAnnouncements,
  getLastAnnouncement,
  updateAnnouncement,
} from './announecment.services';
import { Announcement } from 'interfaces/Announcement';

export async function createAnnouncementController(req: Request, res: Response) {
  try {
    const announcement: Announcement | null = await createAnnouncement({
      title: req.body.title,
      place: req.body.place,
      description: req.body.description,
    });

    if (!announcement) throw new Error('Error announcement was not created');
    resSuccess(res, { message: 'Success', announcement });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}

export async function updateAnnouncementController(req: Request, res: Response) {
  try {
    const announcement: Announcement | null = await updateAnnouncement(
      Number(req.params.id),
      {
        title: req.body.title,
        place: req.body.place,
        description: req.body.description,
      }
    );

    if (!announcement) throw new Error('Error announcement was not updated');
    resSuccess(res, { message: 'Success', announcement });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}

export async function deleteAnnouncementController(req: Request, res: Response) {
  try {
    await delteAnnouncement(Number(req.params.id));

    resSuccess(res, { message: 'Success' });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}

export async function getLastAnnouncementController(req: Request, res: Response) {
  try {
    const announcements = getAllAnnouncements();
    resSuccess(res, { message: 'sucess', announcements });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}

export async function getAllAnnouncementController(req: Request, res: Response) {
  try {
    const announcement = getLastAnnouncement();
    resSuccess(res, { message: 'sucess', announcement });
  } catch (error) {
    return resErr(res, error as Error | string);
  }
}
