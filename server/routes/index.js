import passport from 'passport';
import controller from '../controllers';

const usersControllers = new controller.users();
const groupControllers = new controller.group();
const messageControllers = new controller.message();

const router = (app) => {
  app.get('/api/user', usersControllers.getAllRegisteredMembers);
  app.get('/api/user/:userid', usersControllers.getOneRegisteredUser);
  app.get('/api/group', groupControllers.getAllGroups);
  app.get('/api/group/:groupid', groupControllers.getOneGroup);
  app.get('/api/group/:groupid/message', messageControllers.getAllGroupMessages);
  app.post('/api/user/signup', usersControllers.createUser);
  app.post('/api/user/login', usersControllers.loginUser);
  app.post('/api/group', groupControllers.createGroup);
  app.post('/api/group/:groupid/message/', messageControllers.sendMessage);
};
export default router;