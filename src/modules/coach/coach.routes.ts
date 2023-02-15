import express, { Router } from 'express';
import { isAdmin, isLoggedIn } from 'utils/auth';
import {
  craeteCoachValidator,
  deleteCoachValidator,
  requestCoachValidator,
  updateCoachValidator,
  updateRequestValidator,
} from './coach.validators';
import {
  cancelRequestCoachContoller,
  createCoachController,
  createRequestCoachController,
  deleteCoachController,
  getAllCoachesController,
  updateCoachController,
  updateRequestCoachContoller,
} from './coach.controllers';
import { emptyValidator } from 'lib/validators';

const router: Router = express.Router();

//User Routes
router.use(isLoggedIn);

//Get All coaches
router.get('/', emptyValidator, getAllCoachesController);

//Request A coach
router.post('/request', emptyValidator, createRequestCoachController);

//Cancel request
router.put(
  '/request/cancel/:id',
  updateRequestValidator,
  cancelRequestCoachContoller
);

// Admin Routes
router.use(isAdmin);

//Update A Request
router.put('/request/:id', requestCoachValidator, updateRequestCoachContoller);

//Create One Coach
router.post('/', craeteCoachValidator, createCoachController);
//Modify Coach
router.put('/:id', updateCoachValidator, updateCoachController);

//delete Coach
router.delete('/:id', deleteCoachValidator, deleteCoachController);
