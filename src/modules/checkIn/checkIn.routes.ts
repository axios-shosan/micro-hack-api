import express, { Router } from 'express';
import { isAdmin, isLoggedIn } from 'utils/auth';
import {
  createCheckInController,
  deleteCheckInController,
  getAllCheckInController,
  getCheckInIdController,
  scanUserController,
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

router.post('/scan', isAdmin, scanUserValidator, scanUserController);

router
  .route('/:id')
  .all(isAdmin)
  .put(updateCheckInValidator, updateCheckInController)
  .delete(deleteCheckInController);

//Uesr Routes
router.get('/checkInCode', isLoggedIn, getCheckInIdController);

export default router;
