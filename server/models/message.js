'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    time: DataTypes.DATE
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Todo, {
          foreignKey: 'user',
          onDelete: 'CASCADE',
        })
      }
    }
  });
  return Message;
};