import bcrypt from 'bcrypt';
import user from '../models';
const User = user.User;

module.exports = {
  create(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return User
      .create({
        username: username,
        email: email,
        password: hashedPassword,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
};