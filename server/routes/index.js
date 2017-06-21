import passport from 'passport';
import usersController from '../controllers';

const usersControllers = new usersController();

const router = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to postit API',
  }));

  app.post('/api/user/signup', usersControllers.createUser);
};

export default router;