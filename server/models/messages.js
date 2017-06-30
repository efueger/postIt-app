const messages = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
      allownull: false
    },
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });
  return Message;
};

export default messages;