import passport from 'passport';
import localStrategy from 'passport-local';
import bcrypt from 'bcrypt';

import passportInit from './passport';
import user from '../models';
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

    if (user.password === hashedPassword) {
      return done(null, user);
    }
  });
}));

export default passport;