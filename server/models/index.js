import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import user from './user';
import group from './group';
import message from './message';
import usergroup from './usergroup';

const path = '../.env';
dotenv.load();
dotenv.config({ path });

// const dbOptions = {
//   "username": process.env.DB_USERNAME,
//   "password": process.env.DB_PASS,
//   "database": process.env.TEST_DATABASE,
//   "host": process.env.DB_HOST,
//   "port": process.env.DB_PORT,
//   "dialect": process.env.DB_DIALECT
// }
// console.log('database name', process.env.DB_DATABASE);

//  const sequelize = new Sequelize(process.env.TEST_DATABASE,
//    process.env.DB_USERNAME, process.env.DB_PASS, dbOptions);

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