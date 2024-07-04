const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
    },
  ),
);

passport.serializeUser(function (user, cb) {
  cb(null, user); // Serialize the entire user object into the session
});

passport.deserializeUser(function (user, cb) {
  cb(null, user); // Deserialize the entire user object from the session
});

module.exports = passport;
