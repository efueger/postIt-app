'use strict';
const groups = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: DataTypes.STRING,
    grouptype: DataTypes.STRING,
    active: DataTypes.NUMBER,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Group;
};

export default groups;