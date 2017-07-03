import req from 'supertest';
import app from '../../app';
import messages from '../fixtures/groupmessage.json';
import groups from '../fixtures/groups.json';
import usergroup from '../fixtures/usergroup.json';
import models from '../../models/';

const message = models.Message;
const group = models.Group;
const userGroup = models.UserGroup;

describe('Message-Routes', () => {
  beforeEach(() => {
    message.sync({ force: false }).then(() => {
      message.create(messages[0]);
    });

    group.sync({ force: false }).then(() => {
      group.create(groups[0]);
    });

    userGroup.sync({ force: false }).then(() => {
      userGroup.create(usergroup[0]);
    })
  });


  it('should return correct object type for messages', (done) => {
    req(app)
      .get('/api/group/4/message')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err; }
        expect(typeof res.body).toEqual('object');
        done();
      });
  });

  it('should create a new message', (done) => {
    req(app)
      .post('/api/group/1/message')
      .send({
        content: 'Discuss everything mount saint gabriel'
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        expect(res.body.content).toEqual('Discuss everything mount saint gabriel');
        done();
      });
  });
});
