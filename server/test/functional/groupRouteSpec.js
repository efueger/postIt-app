import req from 'supertest';
import app from '../../app';
import groups from '../fixtures/user.json';
import models from '../../models/';

const group = models.Group;

describe('Group-Routes', () => {
  beforeEach(() => {
    return group.sync({ force: false }).then(() => {
      group.bulkCreate(groups);
    });
  });

  afterEach(() => {
    return group.destroy({ truncate: true, cascade: true });
  });

  it('should return correct object type for users', (done) => {
    req(app)
      .get('/api/group/')
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
      .get('/api/group/1/')
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
      .post('/api/group')
      .send({
        groupname: 'mount saint gabriel',
        description: 'Discuss everything mount saint gabriel',
        grouptype: 'SchoolMemories'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body.groupname).toEqual('mount saint gabriel');
        done();
      });
  });
});
