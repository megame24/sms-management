'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sms = sequelize.define('Sms', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'sent'
    },
    toId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fromId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Sms.associate = function(models) {
    Sms.belongsTo(models.Contacts, {
      as: 'to',
      foreignKey: 'toId'
    });
    Sms.belongsTo(models.Contacts, {
      as: 'from',
      foreignKey: 'fromId'
    });
  };
  return Sms;
};