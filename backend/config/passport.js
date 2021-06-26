const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const authManager = require("../manager/authManager");
const bcrypt = require("bcryptjs");
const conf = require("./auth-credentials");
module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: conf.secret.jwtSecret,
  };
  passport.use(
    "jwt",
    new JwtStrategy(options, async (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    })
  );
  passport.use(
    'basicLogin',
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const loginObj = { email: username };
        const response = await authManager.checkLogin(loginObj);
        if (Array.isArray(response)) {
          if (response.length) {
            bcrypt.compare(password, response[0].password).then((result) => {
              if (result) {
                return done(null, response[0]._id);
              } else {
                return done(null, false);
              }
            });
          } else {
            return done(null, false);
          }
        } else {
          console.log("invalid");
          return done(null, false);
        }
      }
    )
  );
};
