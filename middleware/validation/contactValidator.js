/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
const Sequelize = require('sequelize');
const { Contact } = require('../../database/models');
const { throwError } = require('../../helpers/errorHelper');

const Op = Sequelize.Op;

/**
 * ContactValidator constructor
 * @returns {undefined}
 */
function ContactValidator() {}

/**
 * Validate contact update
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Function} next
 */
ContactValidator.prototype.validateUpdate = async (req, res, next) => {
  let { name, email, phoneNumber } = req.body;
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  name = name && name.trim() ? name.trim() : null;
  email = email && email.trim() ? email.trim() : null;
  phoneNumber = phoneNumber && phoneNumber.trim() ? phoneNumber.trim() : null;
  try {
    if (email && !emailRegEx.test(email)) throwError('Invalid email', 400);
    const contact = await Contact.findAll({
      where: {
        [Op.or]: [{ email }, { phoneNumber }]
      }
    });
    if (contact.length) throwError('This email or phoneNumber already exists', 400);
    req.body = { ...req.body, name, email, phoneNumber };
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = new ContactValidator();
