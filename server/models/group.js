'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    groupname: DataTypes.STRING,
    grouptype: DataTypes.STRING,
    active: DataTypes.NUMBER,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Group;
};