
const users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9\_\-]+$/i,
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
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