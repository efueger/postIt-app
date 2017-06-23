const messages = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.TEXT,
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId',
          targetKey: 'messageId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Message;
};

export default messages;