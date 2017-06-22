import group from '../models';
const Group = group.Group;

export default class GroupHelpers {
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
      .then((group) => res.status(201).send(group))
      .catch((error) => res.status(400).send(error));
    });    
  }
}