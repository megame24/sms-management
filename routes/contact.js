const { Router } = require('express');
const { deleteContact, updateContact } = require('../controllers/ContactController');
const { authenticateContact } = require('../middleware/authMiddleware');
const { validateUpdate } = require('../middleware/validation/contactValidator');

const router = Router();

router.delete(
  '/contact',
  authenticateContact,
  deleteContact
);

router.put(
  '/contact',
  authenticateContact,
  validateUpdate,
  updateContact
);

module.exports = router;
