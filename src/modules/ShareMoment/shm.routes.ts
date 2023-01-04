import express, { Router } from 'express';
import { isAdmin, isLoggedIn } from 'utils/auth';
import { createShmValidator, updateShmValidator } from './shm.validators';
import { createShmController, updateShmController } from './shm.controllers';

const router: Router = express();

// - Get Points of all users

//Uesr Routes
router.use(isLoggedIn);

//admin Routes
router.use(isAdmin);

// - Release new Session
router.post('/session/craete', createShmValidator, createShmController);

// - Get All images of a session
router.get('/session/:id/images');

// - Update Session
router.put('/session/:id', updateShmValidator, updateShmController);

// - Delete a Moment
router.delete('/moment/:id');

export default router;
