import models from '../../models/';
import groupMessages from '../fixtures/groupmessage.json';
import sequelize from '../utils/db.js';

const GroupMessages = models.Message;
const groupFourMessages = [
  {
    "id": 6,
    "groupname": "Ether",
    "grouptype": "relativity",
    "description": "The previous understanding of the universe",
    "createdAt": "2017-06-23T14:05:37.749Z",
    "updatedAt": "2017-06-23T14:05:37.749Z"
  }
];

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
        groupId: groupId
      }
    })
    .then((messages) => {
      expect(messages).toEqual(groupMessages);
    });
  });

});