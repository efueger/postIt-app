import model from '../models';
const Group = model.Group;
const User = model.User;
const UserGroup = model.UserGroup;

export default class GroupHelpers {
  /**
  * Get all created groups
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  getAllGroups(req, res) {
    Group.findAll({})
    .then((group) => res.status(200).json(group));
  }

  /**
  * Get a group from created groups
  * @param {objec} req for first parameter
  * @param {objec} req for second parameter
  */
  getOneGroup(req, res) {
    const groupid = req.params.groupid;
    Group.findOne({
      where: {
        id: groupid
      }
    }).then((user) => res.status(200).json(user));
  }

  /**
  * Create new group
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  createGroup(req, res) {
    const groupName = req.body.groupName;
    const description = req.body.description;
    const groupType = req.body.groupType;
    const creator = req.body.username;

    Group.sync({force: false}).then(() => {
      return Group
      .create({
        groupName: groupName,
        description: description,
        groupType: groupType,
        createdBy: creator
      })
      .then((group) => {
        res.status(200).send(group);
      });
    });   
  }
  
  /**
  * Add user to created group
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  addUserToGroup(req, res) {
    const groupid = req.params.groupid;
    const user = req.body.username;

    Group.findOne({
      where: {
        id: groupid
      }
    }).then((group) => {
      User.findOne({
        where: {
          username: user
        }
      }).then((user) => {
        UserGroup.sync({force: false})
        .then(() => {
          UserGroup
          .create({
            userId: user.id,
            groupId: group.id
          });
          res.status(200).json(user);
        });     
      });
    });
  }

  /**
  * Add user to created group
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  getAllUsersInAGroup(req, res) {
    const groupid= req.params.groupid;
    UserGroup.findAll({
      where: {
        groupId: groupid
      }
    }).then((userGroup) => {
      res.status(200).json(userGroup);
    })
  }
}