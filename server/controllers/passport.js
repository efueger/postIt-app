import passport from 'passport';
import localStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import user from '../models';

const LocalStrategy = localStrategy.Strategy;
const passportConfig = () => {
  // Configure strategy for application
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    user.User.findOne({
      where: {
        'id': id
      }
    });
  });
}
export default passportConfig;