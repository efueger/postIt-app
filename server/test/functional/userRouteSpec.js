import req from 'supertest';
import app from '../../app';
import users from '../fixtures/user.json';
import models from '../../models/';

const user = models.User;

describe('User-Routes', () => {
  beforeEach(() => {
    user.destroy({ truncate: true, cascade: true });
    user.sync({ force: false }).then(() => {
      user.create(users[0]);
      });
  });

  afterEach(() => {
    user.destroy({ truncate: true, cascade: true });
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
        if (err) { throw err; }
        expect(res.body.username).toEqual('myuser');
        done();
      });
  });
  
  it('should sign in a created user', (done) => {
    req(app)
      .post('/api/user/login')
      .send({
        username: 'myuser',
        password: 'johns_password'
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json')
        expect(res.body.status).toEqual('success');
        done();
      });
  });

  it('should not sign in an unregistered user', (done) => {
    req(app)
      .post('/api/user/login')
      .send({
        username: 'johndoe',
        password: 'johns_password'
      })
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.type).toEqual('application/json')
        expect(res.body.status).toEqual('User not found');
        done();
      });
  });
});
