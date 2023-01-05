import express, { Router } from 'express';
import { isAdmin, isLoggedIn } from 'utils/auth';
import uploadShmImage from 'middleware/multer';
import { shareMomentController } from './shm.controllers';
import { shareMomentValidator } from './shm.validator';

const router: Router = express();

// - Get Points of all users

//Uesr Routes
router.use(isLoggedIn);

router.post(
  '/share',
  uploadShmImage.array('pictures', 2),
  shareMomentValidator,
  shareMomentController
);
//admin Routes
router.use(isAdmin);

export default router;
