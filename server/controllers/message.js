import model from '../models';
import message from '../models';

const Group = model.Group;
const Message = model.Message;
const User = model.User;
const UserGroup = model.UserGroup;

export default class MessageHelpers {
  /**
  * Create new group
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  sendMessage(req, res) {
    const groupId = req.params.groupid;
    const messageContent = req.body.content;
    const messageOwner = req.body.username;

    UserGroup.findOne({
      where: {
        groupId: groupId
      }
    }).then((user) => {
      UserGroup.findOne({
        where: {
          groupId: groupId,
          userId: user.id
        }
      }).then((userGroup) => {
        Message.sync({force: false}).then(() => {
          return Message
          .create({
            groupId: userGroup.groupId,
            content: messageContent,
            userId: userGroup.userId
          })
          .then(message => res.status(200).send(message));
        }); 
      });     
    });
  };
  /**
  * Get All group messages
  * @param {object} req as first parameter
  * @param {object} res as second parameter
  */
  getAllGroupMessages(req, res) {
    const groupId = req.params.groupid;
    Group.findOne({
      where: {
        id: groupId
      }
    }).then((group) => {
      Message.findAll({
        where: {
          'groupId': groupId
        }
      }).then((message) => {
        res.status(200).json(message);
      });
    });   
  };
};