import passport from 'passport';
import localStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import user from '../models';

const LocalStrategy = localStrategy.Strategy;

const passportConfig = (app) => {
  // Middleware to initialize passport
  app.use(passport.initialize());
  // Middleware to persist login sessions
  app.use(passport.session());
  // Configure strategy for application
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    user.User.findOne({
      where: {
        'id': id
      }
    }).then ((user) => {
      if (user == null) {
        done(new Error('Wrong user id.'));
      }

      done(null, user);
    })
  })
}
export default passportConfig;