'use strict';

module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 }
    }
  });
  Review.associate = function (models) {
    // associations can be defined here
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