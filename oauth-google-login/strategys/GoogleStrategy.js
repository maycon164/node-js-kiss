const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const credentials = require('../config/index.js');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = credentials

const GoogleStrategyImplementation = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
    console.log('UserProfile: ', profile)
    console.log('Token: ', accessToken)
    return done(null, {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        type: 'LOGGED THROUGH GOOGLE'
    })
})

module.exports = { GoogleStrategyImplementation }