const { Router } = require('express');
const AuthValidator = require('../middleware/validation/AuthValidator');
const AuthController = require('../controllers/AuthController');

const { validateReg, validateLogin } = AuthValidator;
const { register, login } = AuthController;

const router = Router();

router.post(
  '/auth/register',
  validateReg,
  register
);

router.post(
  '/auth/login',
  validateLogin,
  login
);

module.exports = router;
