
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
  "database": process.env.TEST_DATABASE,
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "dialect": process.env.DB_DIALECT
}
console.log('database name', process.env.TEST_DATABASE);
let db = {}

const sequelize = new Sequelize(process.env.TEST_DATABASE,
  process.env.DB_USERNAME, process.env.DB_PASS, dbOptions);
//const sequelize = new Sequelize(process.env.DB_URL);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
console.log('The database models', db.User);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
