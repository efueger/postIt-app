import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';

// Set up the express app
const app = express();

// Configure environment variables
dotenv.config({ path: './.env' });

// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure session middleware
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

// Configure passport for app
app.use(passport.initialize());
app.use(passport.session());
// Import our routes into the application
require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the begining of nothingness.',
}));

const port = process.env.PORT_DEV;

app.listen(port);
console.log('Listen to app at port...', port);

export default app;