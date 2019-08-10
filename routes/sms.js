const { Router } = require('express');
const smsValidator = require('../middleware/validation/smsValidator.js');
const SmsController = require('../controllers/SmsController');
const authMiddleware = require('../middleware/authMiddleware');

const { validateSend } = smsValidator;
const { sendMessage, getMessages } = SmsController;
const { authenticateContact } = authMiddleware;

const router = Router();

router.post(
  '/sms',
  authenticateContact,
  validateSend,
  sendMessage
);

router.get(
  '/sms',
  authenticateContact,
  getMessages
);

module.exports = router;
