import express, { Router } from 'express';
import { loginValidator, registerValidator } from './auth.validator';

import { loginController, registerController } from './auth.controller';
import { isLoggedIn } from 'middleware/auth';

const router: Router = express.Router();

router.post('/login', loginValidator, loginController);
router.post('/register', registerValidator, registerController);
router.get('/me', isLoggedIn, (req, res) => {
  res.json({
    user: req.context.user,
  });
});

export default router;
