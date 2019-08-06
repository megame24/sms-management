const crypto = require('crypto');
const { Contact } = require('../database/models');
const tokenService = require('../services/tokenService');
const { throwError } = require('../helpers/errorHelper');

/**
 * AuthController constructor
 * @returns {undefined}
 */
function AuthController() { }

/**
 * Registration controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
AuthController.register = async (req, res, next) => {
  let { name, email, password, phoneNumber } = req.body;
  const hash = crypto.createHash('sha256');
  hash.update(password);
  password = hash.digest('hex');
  try {
    await Contact.create({ name, email, password, phoneNumber });
    const contact = await Contact.findOne({ where: { email } });
    const tokenPayload = {
      id: contact.id,
      phoneNumber
    };
    const token = tokenService.generateToken(tokenPayload);
    res.status(201).json({
      contact,
      token,
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
AuthController.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const contact = await Contact.scope('withPassword').findOne({ where: { email } });
    if (!contact) throwError('Email or Password is invalid', 401);
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    if (hashedPassword !== contact.password) {
      throwError('Email or Password is invalid', 401);
    }
    delete contact.dataValues.password;
    const tokenPayload = {
      id: contact.id,
      phoneNumber: contact.phoneNumber
    };
    const token = tokenService.generateToken(tokenPayload);
    res.status(201).json({
      contact,
      token,
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
  } catch (err) {
    next(err);
  }
};

module.exports = AuthController;
