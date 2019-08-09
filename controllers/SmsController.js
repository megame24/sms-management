const { Sms } = require('../database/models');

/**
 * SmsController constructor
 * @returns {undefined}
 */
function SmsController() { }

/**
 * Send sms controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
SmsController.send = async (req, res, next) => {
  let { message, recipient } = req.body;
  const { contact } = req;
  try {
    await Sms.create({
      message,
      toId: recipient.id,
      fromId: contact.id
    });
    res.status(201).json({
      message,
      from: contact.phoneNumber,
      to: recipient.phoneNumber
    });
  } catch (err) {
    next(err);
  }
};

module.exports = SmsController;
