import express, { Router } from 'express';
import { isAdmin, isLoggedIn } from 'utils/auth';
import uploadShmImage from 'middleware/multer';
import {
  deleteSharedMomentController,
  getAllSharedMomentsController,
  getSharedMomentsController,
  getTaggedMomentsController,
  hasSharedMomentController,
  shareMomentController,
  updateShareMomentController,
} from './shm.controllers';
import {
  deleteShareMomentValidator,
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
  shareMomentValidator,
  uploadShmImage.array('pictures', 2),
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
router.get('/all', emptyValidator, getAllSharedMomentsController);
router.delete(
  '/delete/:id',
  deleteShareMomentValidator,
  deleteSharedMomentController
);

export default router;
