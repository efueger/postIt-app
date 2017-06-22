import passport from 'passport';
import usersController from '../controllers';
import groupController from '../controllers';

const usersControllers = new usersController.users();
const groupControllers = new groupController.group();

const router = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to postit API',
  }));

  app.post('/api/user/signup', usersControllers.createUser);

  app.post('/api/user/login', usersControllers.loginUser);

  app.post('/api/group', groupControllers.createGroup);
};

export default router;