const userGroup = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('userGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  return UserGroup;
};
export default userGroup;