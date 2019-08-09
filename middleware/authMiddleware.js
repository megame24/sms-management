const tokenService = require('../services/tokenService');
const { Contact } = require('../database/models');
const { throwError } = require('../helpers/errorHelper');

/**
* Authentication middleware
 * @returns {undefined}
*/
function AuthMiddleware() {}

/**
* Authenticate contact
* @param {Object} req request object
* @param {Object} res response object
* @param {Function} next a call to the next function
* @returns {Object} a function on success and an error object on failure
*/
AuthMiddleware.prototype.authenticateContact = async (req, res, next) => {
  let decoded;
  const { token } = req.headers;
  try {
    // return error if no token
    if (!token) throwError('Token not present or invalid', 401);
    if (token) decoded = tokenService.verifyToken(token);
    // return error if no token is invalid
    if (!decoded) throwError('Token not present or invalid', 401);
    const contact = await Contact.findByPk(decoded.id);
    // return error if contact is not found
    if (!contact) throwError('Contact not found', 404);
    req.contact = contact;
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = new AuthMiddleware();
