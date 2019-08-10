const { Sms } = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * SmsController constructor
 * @returns {undefined}
 */
function SmsController() { }

/**
 * Send message controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
SmsController.sendMessage = async (req, res, next) => {
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

/**
 * Get messages controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
SmsController.getMessages = async (req, res, next) => {
  const { contact: { id } } = req;
  const msgsForStatusUpdate = [];
  try {
    const messages = await Sms.findAll({
      where: {
        [Op.or]: [{ toId: id }, { fromId: id }]
      }
    });
    messages.forEach((message) => {
      if (message.dataValues.toId === id && message.dataValues.status === 'sent') {
        msgsForStatusUpdate.push({id: message.dataValues.id});
      }
    });
    await Sms.update({ status: 'read' }, { where: { [Op.or]: msgsForStatusUpdate } });
    res.status(201).json(messages);
  } catch (err) {
    next(err);
  }
};

module.exports = SmsController;
