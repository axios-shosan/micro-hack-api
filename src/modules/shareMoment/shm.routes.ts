import express, { Router } from 'express';
import { isAdmin, isLoggedIn } from 'utils/auth';
import uploadShmImage from 'middleware/multer';
import {
  getSharedMomentsController,
  getTaggedMomentsController,
  hasSharedMomentController,
  shareMomentController,
  updateShareMomentController,
} from './shm.controllers';
import {
  emptyValidator,
  shareMomentValidator,
  updateShareMomentValidator,
} from './shm.validator';
import {
  hasSharedMomentMiddleware,
  hasntSharedMomentMiddleware,
} from './shm.middleware';

const router: Router = express();

// - Get Points of all users

//Uesr Routes
router.use(isLoggedIn);

router.get(
  '/',
  emptyValidator,
  hasSharedMomentMiddleware,
  getSharedMomentsController
);

router.get(
  'hasShared',
  emptyValidator,
  hasSharedMomentMiddleware,
  hasSharedMomentController
);

router.get(
  '/tagged',
  emptyValidator,
  hasntSharedMomentMiddleware,
  getTaggedMomentsController
);

router.post(
  '/share',
  hasSharedMomentMiddleware,
  uploadShmImage.array('pictures', 2),
  shareMomentValidator,
  shareMomentController
);

router.put(
  '/update/:id',
  hasSharedMomentMiddleware,
  updateShareMomentValidator,
  updateShareMomentController
);
//admin Routes
router.use(isAdmin);

export default router;
