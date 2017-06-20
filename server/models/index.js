
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';

dotenv.load();
dotenv.config({ path: '../.env' });
const dbOptions = {
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASS,
  "database": process.env.DB_DATABASE,
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "dialect": process.env.DB_DIALECT
}
console.log('database name', process.env.DB_DATABASE);
let db = {}

 const sequelize = new Sequelize(process.env.DB_DATABASE,
   process.env.DB_USERNAME, process.env.DB_PASS, dbOptions);
//const sequelize = new Sequelize('postgres://ewafgpki:d-1N8gjzcalwq_db1ybHajguEBUxIEtV@stampy.db.elephantsql.com:5432/ewafgpki');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
