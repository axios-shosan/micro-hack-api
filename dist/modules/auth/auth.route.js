'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const auth_validator_1 = require('./auth.validator');
const auth_controller_1 = require('./auth.controller');
const router = express_1.default.Router();
router.post(
  '/login',
  auth_validator_1.loginValidator,
  auth_controller_1.loginController
);
router.post(
  '/register',
  auth_validator_1.registerValidator,
  auth_controller_1.registerController
);
exports.default = router;
