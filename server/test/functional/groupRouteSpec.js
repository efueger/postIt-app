import req from 'supertest';
import app from '../../app';
import groups from '../fixtures/groups.json';
import users from '../fixtures/user.json';
import models from '../../models/';

const group = models.Group;
const user = models.User

describe('Group-Routes', () => {
  beforeEach(() => {
    group.sync({ force: false }).then(() => {
      group.create(groups[0]);
    });

    user.sync({ force: false }).then(() => {
      user.create(users[0]);
    })
  });

  it('should return correct object type for all created groups', (done) => {
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

  it('should return correct object type for a created group', (done) => {
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

  it('should create a new group', (done) => {
    req(app)
      .post('/api/group')
      .send({
        groupName: 'mount saint gabriel',
        description: 'Discuss everything mount saint gabriel',
        groupType: 'SchoolMemories',
        username: 'johnson'
      })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.type).toEqual('application/json');
        expect(res.body.groupName).toEqual('mount saint gabriel');
        expect(res.body.description).toEqual('Discuss everything mount saint gabriel');
        expect(res.body.groupType).toEqual('SchoolMemories');
        expect(res.body.createdBy).toEqual('johnson');
        done();
      });
  });

  it('should add user to a created group', (done) => {
    req(app)
    .post('/api/group/2/user')
    .send({
      username: 'johnson'
    })
    .end((err, res) => {
      expect(res.status).toEqual(200);
      expect(res.type).toEqual('application/json');
      expect(res.body.status).toEqual('User successfully added');
    });
  });

  it('should get all users in a group', (done) => {
    req(app)
    .get('/api/group/2/user')
    .end((err, res) => {
      expect(res.status).toEqual(200);
      expect(res.type).toEqual('application/json');
    });
  });
});
