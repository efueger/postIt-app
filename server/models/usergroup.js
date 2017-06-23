const UserGroup = (sequelize, DataTypes) => {
  const userGroup = sequelize.define('userGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId',
          targetKey: 'messageId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return userGroup;
};