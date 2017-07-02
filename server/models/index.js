import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import user from './user';
import group from './group';
import message from './message';
import usergroup from './usergroup';

const path = '../.env';
dotenv.load();
dotenv.config({ path });

const sequelize = new Sequelize(process.env.TEST_URL);
const User = user(sequelize, Sequelize);
const Group = group(sequelize, Sequelize);
const Message = message(sequelize, Sequelize);
const UserGroup = usergroup(sequelize, Sequelize);

const db = { Group: Group,
  User,
  Message,
  UserGroup
};

User.associate(db);
Group.associate(db);
Group.associate(db);
Message.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;