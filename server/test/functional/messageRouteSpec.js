import req from 'supertest';
import app from '../../app';
import messages from '../fixtures/groupmessage.json';
import models from '../../models/';

const message = models.Message;

describe('Message-Routes', () => {
  beforeEach(() => {
    return message.sync({ force: false }).then(() => {
      message.bulkCreate(groups);
    });
  });

  afterEach(() => {
    return message.destroy({ truncate: true, cascade: true });
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

  it('should create a new user', (done) => {
    req(app)
      .post('/api/group/4/message')
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
