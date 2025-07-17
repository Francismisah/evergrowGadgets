const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { env } = require('./env');
const AuthService = require('../services/auth.service');

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const auth = await AuthService.googleAuth(profile);
        done(null, auth);
      } catch (err) {
        done(err);
      }
    }
  ),
);

module.exports = passport;