import express, { Router } from 'express';
import { isAdmin } from 'utils/auth';
import {
  createShmSessionValidator,
  updateShmSessionValidator,
} from './shmSession.validators';
import {
  createShmSessionController,
  updateShmSessionController,
} from './shmSession.controllers';

const router: Router = express();

//admin Routes
router.use(isAdmin);

// - Release new Session
router.post('/', createShmSessionValidator, createShmSessionController);

// - Get All images of a session
router.get('/:id/images');

// - Update Session
router.put('/:id', updateShmSessionValidator, updateShmSessionController);

export default router;
