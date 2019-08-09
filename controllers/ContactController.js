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
    const result = await Contact.destroy({ where: { id: contact.id } });
    console.log(result);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

module.exports = ContactController;
