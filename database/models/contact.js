'use strict';
const defaultAttributes = ['id', 'name', 'email', 'phoneNumber']

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    defaultScope: {
      attributes: defaultAttributes
    },
    scopes: {
      withPassword: {
        attributes: [...defaultAttributes, 'password']
      }
    }
  });
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};