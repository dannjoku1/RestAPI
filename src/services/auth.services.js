import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../modules/users/user.model';
import constants from '../config/constants';

// user email rather than username 
const localOpts = {
  usernameField: 'email',
};

// local strategy 
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

// JWT strategy 
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false }); // using jwt instead 
export const authJwt = passport.authenticate('jwt', { session: false });