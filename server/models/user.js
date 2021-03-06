
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
      },
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    salt: DataTypes.STRING
  });

  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: 'UserGroup'
    });
  };
  return User;
};

export default users;