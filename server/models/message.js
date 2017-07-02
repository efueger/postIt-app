const messages = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
      allownull: false
    },
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Group, {
      onDelete: 'CASCADE',
      foreignKey: 'groupId'
    });
  };
  return Message;
};

export default messages;