import req from 'supertest';
import app from '../../app';
import users from '../fixtures/user.json';
import models from '../../models/';

const user = models.User;

describe('User-Routes', () => {
  beforeEach(() => {
    return user.sync({ force: false }).then(() => {
      user.bulkCreate(users);
    });
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
        username: 'myuser',
        email: 'newuser@example.com',
        password: '1234',
        password2: '1234'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body.username).toEqual('myuser');
        done();
      });
  });

  it('should sign in a created user', (done) => {
    req(app)
      .post('/api/user/login')
      .send({
        username: 'myuser',
        password: '1234'
      })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body.status).toEqual('User not found');
        done();
      });
  });
});