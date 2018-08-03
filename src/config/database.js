/* eslint-disable no-console */

// Configuration for database

import mongoose from 'mongoose';
import constants from './constants';

//remove warning with promise
mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGO_URL);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

// error handler
mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });
