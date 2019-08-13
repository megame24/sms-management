const { Router } = require('express');
const { validateSend } = require('../middleware/validation/smsValidator.js');
const { sendMessage, getMessages } = require('../controllers/SmsController');
const { authenticateContact } = require('../middleware/authMiddleware');

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
