import usersController from '../controllers';

const usersControllers = usersController;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to postit API',
  }));

  app.post('/api/user/signup', usersControllers.create);
};