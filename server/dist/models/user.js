'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Business, {
      foreignKey: 'businessId',
      as: 'businesses'
    });
    User.hasMany(models.Review, {
      foreignKey: 'reviewId',
      as: 'reviews'
    });
  };
  return User;
};