import models from '../../models/';
import users from '../fixtures/user.json';
import Fixtures from 'sequelize-fixtures';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

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

const user = models.User;
// console.log('User values', user.username);

describe('User', () => {
  beforeEach(() => {
    return user.bulkCreate(users);
  });

  afterEach(() => {
    return user.destroy({ truncate: true, cascade: true });
  });

  it('Should connect to the DB', () => {
    sequelize.authenticate()
    .then((err) => {
      expect(err).toBe(undefined);
    });

  });

  it('Should load the passport plugin', () => {

  });

  it('Should retrieve by username', () => {

  });

  describe('username', () => {
    it('should be required', () => {
      //expect(user.username.unique).toEqual(true);
    });

    it('should be alphanumberic and have 4-255 chars', () => {

    });
  })

  describe('email', () => {
    it('should be required', () => {

    });

    it('should be a string', () => {

    });

    it('should be unique', () => {

    });

    it('should be valid email', () => {

    });
  });
})