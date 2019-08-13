const { Contact } = require('../../database/models');
const { throwError } = require('../../helpers/errorHelper');

/**
 * SmsValidator constructor
 * @returns {undefined}
 */
function SmsValidator() {}

/**
 * Validate sending sms
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Function} next
 */
SmsValidator.prototype.validateSend = async (req, res, next) => {
  let { message, recipientNumber } = req.body;
  const { contact: { id } } = req;
  message = message && message.trim() ? message.trim() : null;
  recipientNumber = recipientNumber && recipientNumber.trim() ? recipientNumber.trim() : null;
  try {
    if (!message) throwError('The message field is required', 400);
    if (!recipientNumber) throwError('The recipientNumber field is required', 400);
    const recipient = await Contact.findOne({ where: { phoneNumber: recipientNumber } });
    if (!recipient || recipient.id === id) throwError('Recipient not found', 400);
    req.body.recipient = recipient;
    req.body = { ...req.body, message, recipientNumber };
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = new SmsValidator();
