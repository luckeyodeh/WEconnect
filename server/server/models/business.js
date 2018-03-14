'use strict';
module.exports = (sequelize, DataTypes) => {
  var Business = sequelize.define('Business', {
    name: DataTypes.STRING,
    details: DataTypes.STRING,
    location: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
  };
  return Business;
};