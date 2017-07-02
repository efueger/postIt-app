const groups = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    grouptype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'UserGroup'
    });

    Group.hasMany(models.Message, {
      foreignKey: 'groupId'
    });
  };
  return Group;
};

module.exports = groups;