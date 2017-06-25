import models from '../../models/';
import users from '../fixtures/user.json';
import sequelize from '../utils/db';

const user = models.User;

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

  it('should test getting a user', () => {
    user.findAll({})
    .then((Users) => {
      expect(Users).toEqual(users);
    });
  });

  it('Should retrieve a user email', () => {
    const username = 'johndoe';
    user.findOne({
      where: {
        username
      }
    }).then((myUser) => {
      expect(myUser.email).toEqual('johndoe@example.com');
    });
  });

  it('should retrieve by email', () => {
    const email = 'johndoe@example.com';
    user.findOne({
      where: {
        email
      }
    }).then((myUser) => {
      expect(myUser.email).toEqual('johndoe@example.com');
    });
  });
});