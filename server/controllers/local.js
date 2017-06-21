import passport from 'passport';
import localStrategy from 'passport-local';

import passportInit from './passport';
import users from '../models/';
import userAuthHelpers from './users';

const LocalStrategy = localStrategy.Strategy;

passportInit();

passport.use(new LocalStrategy((username, password, done) =>{
  user.User.findOne({
    where: {
      'username': username
    }
  }).then((user) => {
    if (user == null) {
      return done(null, false, { message: 'Incorrect credentials.' })
    }

    const hashedPassword = bcrypt.hashSync(password, user.salt);

    If (user.password === hashedPassword) {
      return done(null, user);
    }

    return done(null, false, { message: 'Incorrect credentials.' });
  });
}));