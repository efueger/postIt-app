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
      res.status(500).json({ status: 'Input all fields' });
    }

    if (password !== password2) {
      res.status.json({ status: 'Input matching passwords' });
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

  /**
  * Log in a registered user
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  loginUser(req, res) {
    passport.authenticate('local', (err, user, info) => {
      if (err) { 
        res.status(500).json({ status: 'error' });
      }

      if (!user) {
        res.status(404).json({ status: 'User not found' });
      }

      if (user) {
        req.logIn(user, (err) => {
          if (err) {
            res.status(500).json({ status: 'error' });
          }

          res.status(200).json({ status: 'success' });
        })
      }
    })(req, res);
  }
}