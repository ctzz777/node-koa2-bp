const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy  = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// local
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({username: username});
    if (user && user.password === password) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
}));

// jwt
passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
}));

module.exports = passport;