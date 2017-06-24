import models from '../../models/';
import users from '../fixtures/user.json';
import sequelize from '../utils/db.js';

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
      'username': username
    }
  }).then((user) => {
      expect(user.email).toEqual('johndoe@example.com');
    });
     
  });

  it('should retrieve by email', () => {
    expect(user.email).toEqual('john@gmail.com');
  })

  // describe('username', () => {
  //   it('should be required', () => {
  //     //expect(user.username.unique).toEqual(true);
  //   });

  //   it('should be alphanumberic and have 4-255 chars', () => {

  //   });
  // })

  // describe('email', () => {
  //   it('should be required', () => {

  //   });

  //   it('should be a string', () => {

  //   });

  //   it('should be unique', () => {

  //   });

  //   it('should be valid email', () => {

  //   });
  // });
})