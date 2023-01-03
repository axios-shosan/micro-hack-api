import express, { Router } from 'express';
import { isAdmin } from 'utils/auth';
import {
  createCheckInController,
  deleteCheckInController,
  getAllCheckInController,
  updateCheckInController,
} from './checkIn.controllers';
import {
  createCheckInValidator,
  scanUserValidator,
  updateCheckInValidator,
} from './checkIn.validators';

const router: Router = express();

//admin Routes
router
  .route('/')
  .all(isAdmin)
  .get(getAllCheckInController)
  .post(createCheckInValidator, createCheckInController);

router
  .route('/:id')
  .all(isAdmin)
  .put(updateCheckInValidator, updateCheckInController)
  .delete(deleteCheckInController);
router.post('/scan', isAdmin, scanUserValidator);

//Uesr Routes
router.get('/checkInCode');

export default router;
