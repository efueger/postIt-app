import models from '../../models/';
import groups from '../fixtures/groups.json';

import sequelize from '../utils/db';

const group = models.Group;
const etherGroup = [
  {
    id: 6,
    groupname: 'Ether',
    grouptype: 'relativity',
    description: 'The previous understanding of the universe',
    createdAt: '2017-06-23T14:05:37.749Z',
    updatedAt: '2017-06-23T14:05:37.749Z'
  }
];

describe('Group', () => {
  beforeEach(() => {
    return group.bulkCreate(groups);
  });

  afterEach(() => {
    return group.destroy({ truncate: true, cascade: true });
  });

  it('Should connect to the DB', () => {
    sequelize.authenticate()
    .then((err) => {
      expect(err).toBe(undefined);
    });
  });

  it('should test getting groups', () => {
    group.findAll({})
    .then((Group) => {
      expect(Group).toEqual(groups);
    });
  });

  it('Should retrieve groups by group name', () => {
    const groupname = 'Ether';
    group.findAll({
      where: {
        groupname
      }
    }).then((mygroup) => {
      expect(mygroup).toEqual(etherGroup);
    });
  });

  it('should retrieve groups by group type', () => {
    const grouptype = 'relativity';
    group.findAll({
      where: {
        grouptype
      }
    }).then((mygroup) => {
      expect(mygroup).toEqual(etherGroup);
    });
  });
});