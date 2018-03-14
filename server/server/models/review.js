'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    user: DataTypes.STRING,
    content: DataTypes.STRING,
    rating: DataTypes.INT
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};