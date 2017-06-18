import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import our routes into the application
require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the begining of nothingness.',
}));

const port = 3000;

app.listen(port);
console.log('Listen to app at port...', port);

export default app;