import Sequelize from 'sequelize';
import dotenv from 'dotenv';

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

const sequelize = new Sequelize(process.env.TEST_DATABASE,
  process.env.DB_USERNAME, process.env.DB_PASS, dbOptions);

export default sequelize;