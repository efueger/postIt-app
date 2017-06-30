const groups = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    grouptype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Group;
};

export default groups;