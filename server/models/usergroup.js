const userGroup = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('userGroup', {
    userId: {
      type: DataTypes.INTEGER,
      references: 'User',
      referencesKey: 'id',
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: 'Group',
      referencesKey: 'id',
      allowNull: false
    }
  });
  return UserGroup;
};
export default userGroup;