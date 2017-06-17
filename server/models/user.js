
const users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Message, {
          foreignKey: 'userId',
          as: 'messages',
        });
      }
    }
  });
  return User;
};

export default users;