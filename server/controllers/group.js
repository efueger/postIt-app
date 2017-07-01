import model from '../models';
const Group = model.Group;
const User = model.User;
const UserGroup = model.UserGroups;

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
        res.status(200).send(group);
      });
    });   
  }

  // addUserToGroup(req, res) {
  //   // Locate the current group using id (params)/api/group/<group id>/user
  //   // Add current user in session to group with 
  //   const groupid = req.params.groupid;
  //   const userid = req.params.userid;
  //   Group.findOne({
  //     where: {
  //       id: groupid
  //     }
  //   }).then((group) => {
  //     User.findOne({
  //       where: {
  //         id: userid
  //       }
  //     }).then((user) => {
        
  //     })
  //     res.status(200).json(group);
  //   });
  //   const groupId = req.params.groupid;
  //   Group.addUser(User, { through: { status: 'started' }});
  // }
}