const { Contact } = require('../../database/models');

/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
const { throwError } = require('../../helpers/errorHelper');

/**
 * AuthValidator constructor
 * @returns {undefined}
 */
function AuthValidator() {}

/**
 * Validate registration
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Function} next
 */
AuthValidator.prototype.validateReg = async (req, res, next) => {
  let { name, email, password, phoneNumber } = req.body;
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!”#$%&'()*+,\-./:;<=>?@\[\]^_`{|}~]).{8,}$/;
  name = name && name.trim() ? name.trim() : null;
  email = email && email.trim() ? email.trim() : null;
  password = password && password.trim() ? password.trim() : null;
  try {
    if (!name) throwError('The name field is required', 400);
    if (name.length > 50) throwError('This name is too long', 400);
    if (!password) throwError('The password field is required', 400);
    if (!passwordRegEx.test(password)) {
      throwError('Your password must be greater than 8 characters and must contain at least one uppercase letter, one lowercase letter, one number, and a special character',
        400);
    }
    if (!phoneNumber) throwError('Phone number is required', 400);
    if (!email) throwError('The email field is required', 400);
    if (!emailRegEx.test(email)) throwError('Invalid email', 400);
    const user = await Contact.findOne({ where: { email } });
    if (user) throwError('This email already exists', 400);
    req.body = { ...req.body, name, email, password };
    return next();
  } catch (err) {
    next(err);
  }
};

/**
 * Validate login
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Function} next
 */
AuthValidator.prototype.validateLogin = async (req, res, next) => {
  let { email, password } = req.body;
  email = email && email.trim() ? email.trim() : null;
  password = password && password.trim() ? password.trim() : null;
  try {
    if (!email) throwError('The email field is required', 400);
    if (!password) throwError('The password field is required', 400);
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = new AuthValidator();
