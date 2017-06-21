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
    })
  }));

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