'use strict';

module.exports = function (sequelize, DataTypes) {
  var Business = sequelize.define('Business', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });
  Business.associate = function (models) {
    // associations can be defined here
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Business.hasMany(models.Review, {
      foreignKey: 'businessId'
    });
  };

  return Business;
};