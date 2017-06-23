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
    Group.findAll({})
    .then((user) => res.status(200).json(user));
  }

  /**
  * Create new group
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  createGroup(req, res) {
    const groupname = req.body.groupname;
    const description = req.body.description;
    const grouptype = req.body.grouptype;
    const userId = 2;

    Group.sync({force: false}).then(() => {
      return Group
      .create({
        groupname: groupname,
        description: description,
        grouptype: grouptype
      })
      .then((group) => {
        UserGroup.sync({ force: false }).then(() => {
          return UserGroup
          .create({
            userId: userId, 
            groupId: group.id
          });
        });
        res.status(200).send(group);
      });
    });
    
  }
}