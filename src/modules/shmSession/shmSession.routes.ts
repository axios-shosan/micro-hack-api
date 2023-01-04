import express, { Router } from 'express';
import { isAdmin, isLoggedIn } from 'utils/auth';
import {
  createShmSessionValidator,
  createShmValidator,
  updateShmSessionValidator,
} from './shmSession.validators';
import {
  createShmSessionController,
  updateShmSessionController,
} from './shmSession.controllers';

const router: Router = express();

// - Get Points of all users

//Uesr Routes
router.use(isLoggedIn);

router.post('/');
//admin Routes
router.use(isAdmin);

// - Release new Session
router.post(
  '/session/craete',
  createShmSessionValidator,
  createShmSessionController
);

// - Get All images of a session
router.get('/session/:id/images');

// - Update Session
router.put(
  '/session/:id',
  updateShmSessionValidator,
  updateShmSessionController
);

// - Delete a Moment
router.delete('/moment/:id');

export default router;
