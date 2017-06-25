import req from 'supertest';
import app from '../../app';
import users from '../fixtures/user.json';
import sequelize from '../utils/db.js';
import models from '../../models/';

const user = models.User;

describe('User-Routes', function(done) {
  beforeEach(() => {
    return user.bulkCreate(users);
  });

  afterEach(() => {
    return user.destroy({ truncate: true, cascade: true });
  });

  it('should return correct object type for users', (done) => {
    req(app)
      .get('/api/user/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err; }
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should return correct object type for a user', (done) => {
    req(app)
      .get('/api/user/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err; }
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should create a new user', (done) => {
    req(app)
      .post('/api/user/signup')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: '1234',
        password2: '1234'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body.username).toEqual('newuser');
        done();
      });
  });
});
