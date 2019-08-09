const { Router } = require('express');
const ContactController = require('../controllers/ContactController');
const authMiddleware = require('../middleware/authMiddleware');

const { deleteContact } = ContactController;
const { authenticateContact } = authMiddleware;

const router = Router();

router.delete(
  '/contact',
  authenticateContact,
  deleteContact
);

module.exports = router;
