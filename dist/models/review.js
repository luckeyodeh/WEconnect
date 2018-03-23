'use strict';

module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    }
  });
  Review.associate = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};