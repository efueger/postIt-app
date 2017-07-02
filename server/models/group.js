const groups = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupName: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    groupType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdBy: {
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

export default groups;