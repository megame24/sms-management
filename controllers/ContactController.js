const { Contact } = require('../database/models');

/**
 * ContactController constructor
 * @returns {undefined}
 */
function ContactController() { }

/**
 * Delete contact controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
ContactController.deleteContact = async (req, res, next) => {
  const { contact } = req;
  try {
    await Contact.destroy({ where: { id: contact.id } });
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

/**
 * Update contact controller
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function in the
 * middleware chain
 * @returns {Object} response object
 */
ContactController.updateContact = async (req, res, next) => {
  const { contact } = req;
  let { name, email, phoneNumber } = req.body;
  name = name ? name : contact.name;
  email = email ? email : contact.email;
  phoneNumber = phoneNumber ? phoneNumber : contact.phoneNumber;
  try {
    const updatedContact = await Contact.update({
      name, email, phoneNumber
    }, {
      where: { id: contact.id },
      returning: true
    });
    delete updatedContact[1][0].dataValues.password;
    res.status(200).json({ contact: updatedContact[1][0] });
  } catch (err) {
    next(err);
  }
};

module.exports = ContactController;
