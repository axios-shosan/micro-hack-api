import express, { Router } from 'express';
import { isAdmin, isLoggedIn } from 'utils/auth';
import {
  createAnnouncementValidatior,
  deleteAnnouncementValidator,
  updateAnnouncementhValidator,
} from './announcment.validators';
import { emptyValidator } from 'lib/validators';
import {
  createAnnouncementController,
  deleteAnnouncementController,
  getAllAnnouncementController,
  getLastAnnouncementController,
  updateAnnouncementController,
} from './announcment.controllers';

const router: Router = express.Router();

//User Routes
router.use(isLoggedIn);

router.get('last-announcment', emptyValidator, getLastAnnouncementController);

router.use(isAdmin);

router
  .route('/')
  .get(emptyValidator, getAllAnnouncementController)
  .post(createAnnouncementValidatior, createAnnouncementController);
router
  .route('/:id')
  .put(updateAnnouncementhValidator, updateAnnouncementController)
  .delete(deleteAnnouncementValidator, deleteAnnouncementController);

export default router;
