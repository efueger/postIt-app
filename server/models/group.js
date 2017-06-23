'use strict';
const groups = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: DataTypes.STRING,
    grouptype: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Group, {
          foreignKey: 'groupId', 
          sourceKey: 'messageId', 
          onDelete: 'CASCADE'
        });

        Group.belongsToMany(models.User, { through: 'UserProject' });
      }
    }
  });
  return Group;
};

export default groups;