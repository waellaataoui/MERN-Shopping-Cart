const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ username: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            username: profile.id,
            email: profile._json.email,
            profileName: profile.displayName,
            thumbnail: profile._json.picture
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            })
            .catch((e) => {
              done(e, false);
            });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebook.appID,
      clientSecret: keys.facebook.appSecret,
      callbackURL: "/auth/facebook/redirect",
      profileFields: ["id", "displayName", "photos", "email"]
    },
    function(accessToken, refreshToken, profile, cb) {
      // check if user already exists in our own db
      User.findOne({ username: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          cb(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            username: profile.id,
            email: profile._json.email,
            profileName: profile.displayName,
            thumbnail: profile._json.picture.data.url
          })
            .save()
            .then((newUser) => {
              cb(null, newUser);
            })
            .catch((e) => {
              cb(e, false);
            });
        }
      });
    }
  )
);
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });
    if (!user) {
      return done(new Error("user doesnt exist "), false);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(new Error("wrong credentials"), false);
    }
    return done(null, user);
  })
);
