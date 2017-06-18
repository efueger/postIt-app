import user from '../models';
const User = user.Todo;

module.exports = {
  create(req, res) {
    return Todo
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then(todo => res.status(201).send(tod0))
      .catch(error => res.status(400).send(error));
  },
};