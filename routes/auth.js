const { Router } = require('express');
const authValidator = require('../middleware/validation/authValidator');
const AuthController = require('../controllers/AuthController');

const { validateReg, validateLogin } = authValidator;
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
