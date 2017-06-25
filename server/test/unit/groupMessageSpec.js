import models from '../../models/';
import groupMessages from '../fixtures/groupmessage.json';
import sequelize from '../utils/db';

const GroupMessages = models.Message;

describe('GroupMessages', () => {
  beforeEach(() => {
    return GroupMessages.bulkCreate(groupMessages);
  });

  afterEach(() => {
    return GroupMessages.destroy({ truncate: true, cascade: true });
  });

  it('Should connect to the DB', () => {
    sequelize.authenticate()
    .then((err) => {
      expect(err).toBe(undefined);
    });
  });

  it('should test getting groups', () => {
    const groupId = 4;
    GroupMessages.findAll({
      where: {
        groupId
      }
    })
    .then((messages) => {
      expect(messages).toEqual(groupMessages);
    });
  });
});