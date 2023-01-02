import express, { Router } from 'express';
import {
  changePasswordValidator,
  loginValidator,
  registerValidator,
} from './auth.validator';

import {
  changePasswordController,
  loginController,
  registerController,
} from './auth.controller';
import { isLoggedIn } from 'utils/auth';

const router: Router = express.Router();

router.post('/login', loginValidator, loginController);
router.post('/register', registerValidator, registerController);
router.put(
  '/changePassword',
  isLoggedIn,
  changePasswordValidator,
  changePasswordController
);

router.get('/me', isLoggedIn, (req, res) => {
  res.json({
    user: req.context.user,
  });
});

export default router;
