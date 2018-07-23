import passport from 'passport';
import LocalStrategy from 'passport-local';
//import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../modules/users/user.model';
//import constants from '../config/constants';

// user email rather than username 
const localOpts = {
  usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return done(null, false);
    } else if (!user.authenticateUser(password)) { 
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false); 
  }
});

passport.use(localStrategy);


export const authLocal = passport.authenticate('local', { session: false }); // using jwt instead 