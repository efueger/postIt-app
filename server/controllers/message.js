import model from '../models';
import message from '../models';

const Group = model.Group;
const Message = model.Message;

export default class MessageHelpers {
  /**
  * Create new group
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  sendMessage(req, res) {

    const groupId = req.params.groupid;
    const messageContent = req.body.content;
    const messageOwnerId = req.params.userid;

    Message.sync({force: false}).then(() => {
      return Message
      .create({
        groupId: groupId,
        content: messageContent,
        userId: messageOwnerId
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
    });  
  }
}