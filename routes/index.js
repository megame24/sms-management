const { Router } = require('express');
const auth = require('./auth');
const sms = require('./sms');
const contact = require('./contact');

const router = Router();
router.use('/api', auth);
router.use('/api', sms);
router.use('/api', contact);

module.exports = router;
