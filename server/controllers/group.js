import model from '../models';
const Group = model.Group;
const UserGroup = model.UserGroups;

export default class GroupHelpers {
  /**
  * Get all created groups
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  getAllGroups(req, res) {
    Group.findAl({})
    .then((user) => res.status(200).json(user));
  }

  /**
  * Create new group
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  createGroup(req, res) {
    Group.sync({force: false}).then(() => {
      return Group
      .create({
        groupname: req.body.groupname,
        description: req.body.description,
        grouptype: req.body.grouptype
      })
      .then((group) => {
        UserGroup.sync({ force: false }).then(() => {
          return UserGroup
          .create({
            userId: userId, 
            groupId: group.id
          });
        });
      });
    });
    res.status(200).send(user);
  }
}