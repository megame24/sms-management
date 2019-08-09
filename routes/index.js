const { Router } = require('express');
const auth = require('./auth');
const sms = require('./sms');

const router = Router();
router.use('/api', auth);
router.use('/api', sms);

module.exports = router;
