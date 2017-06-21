import bcrypt from 'bcrypt';
import user from '../models';
import passport from './local';
const User = user.User;

export default class UserHelpers {
  /**
  * Create new user
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  createUser(req, res) {
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    const password2 = req.body.password2;

    if (!username || !password || !password2 || !email) {
      res.send('Input all fields');
    }

    if (password !== password2) {
      res.send('Input matching passwords');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log('Username value',User.create);
    User.sync({force: false}).then(() => {
      return User
      .create({
        username: username,
        email: email,
        password: hashedPassword,
        salt: salt
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
    });    
  }
}