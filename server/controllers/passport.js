import passport from 'passport';
import localStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import user from '../models';

const passportConfig = (app) => {
  // Middleware to initialize passport
  app.use(passport.initialize());
  // Middleware to persist login sessions
  app.use(passport.session());


}