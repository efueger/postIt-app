import passport from 'passport';
import controller from '../controllers';

const usersControllers = new controller.users();
const groupControllers = new controller.group();

const router = (app) => {
  app.get('/api', usersControllers.getAllRegisteredMembers);
  app.get('/api/group', groupControllers.getAllGroups);

  app.post('/api/user/signup', usersControllers.createUser);

  app.post('/api/user/login', usersControllers.loginUser);

  app.post('/api/group', groupControllers.createGroup);
};

export default router;