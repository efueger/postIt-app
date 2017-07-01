import bcrypt from 'bcrypt';
import user from '../models';
import passport from './local';
const User = user.User;

export default class UserHelpers {
  /**
  * Get all registered members
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  getAllRegisteredMembers(req, res) {
    User.findAll({})
    .then((user) => res.status(200).json(user))
    .catch((user) => res.status(400).json('error'));
  };

  /**
  * Get one registered user
  * @param {object} req for first parameter
  * @param {object} req for second parameter
  */
  getOneRegisteredUser(req, res) {
    const userId = req.params.userid;
    User.findOne({
      where: {
        'id': userId
      }
    }).then((user) => res.status(200).json(user));
  };
  
  /**
  * Create new user
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  createUser(req, res, next) {
    const password = req.body.password;
    const username = req.body.username;
    const email = req.body.email;
    const password2 = req.body.password2;
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
      .then((user) => { res.status(201).send(user); });
    });    
  }

  /**
  * Log in a registered user
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  */
  loginUser(req, res) {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        res.status(404).json({ status: 'User not found' });
      };
      if (user) {
        req.logIn(user, (err) => {
           res.status(200).json({ status: 'success' });
        });
      };
    })(req, res);
  };
};