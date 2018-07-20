import express from 'express';

import constants from './config/constants'
import './config/database'
import middlewaresConfig from './config/middlewares'

/*
console.log('=====================');
console.log(constants);
console.log('=====================');
*/

const app = express(); // creates an instance of express 

middlewaresConfig(app);

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else { 
    console.log(`
    Server is running on port: ${constants.PORT}
    --------
    Running on ${process.env.NODE_ENV}
    --------
    Let's get it!!
    `)
  }
} )

