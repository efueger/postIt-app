import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import user from './user';
import group from './group';
import message from './messages';
import userGroup from './usergroup';

const path = '../.env';
dotenv.load();
dotenv.config({ path });

const sequelize = new Sequelize(process.env.TEST_URL);
const UserGroup = userGroup(sequelize, Sequelize);
const User = user(sequelize, Sequelize);
const Group = group(sequelize, Sequelize);
const Message = message(sequelize, Sequelize);

UserGroup.belongsTo(User);
User.belongsToMany(Group, { through: UserGroup });
UserGroup.belongsTo(Group);
Group.belongsToMany(User, { through: UserGroup });

Message.belongsTo(Group);

const db = { Group: Group,
  User,
  Message,
  UserGroup
};

export default db;