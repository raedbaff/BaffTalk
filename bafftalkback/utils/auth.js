const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        const user = {
          existingUser: existingUser,
          profile: profile,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        return cb(null, user);
      } else {
        try {
          const newUser = {
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            googleId: profile.id,
          };
          await User.create(newUser);
          const user = {
            profile: profile,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          return cb(null, user);
        } catch (error) {
          console.log(error);
        }
      }
    }
  )
);
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, {
          status: 404,
          message: "User does not exist",
        });
      }
      const isMatch = await user.verifyPassword(password);

      if (!isMatch) {
        return done(null, false, {
          status: 401,
          message: "Incorrect password.",
        });
      }

      return done(null, user);
    } catch (error) {
      console.log(error.message);
      return done(error);
    }
  })
);
passport.serializeUser((user, done) => {
  if (user.existingUser) {
    done(null, user.existingUser._id.toString()); // Store user ID in session
  } else {
    done(null, user._id.toString());
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
