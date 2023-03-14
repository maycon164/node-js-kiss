require('dotenv').config()
const DiscordStrategy = require('passport-discord').Strategy;

const credentials = require('../config');
const { DISCORD_CALLBACK_URL, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = credentials;

const DiscordStrategyImplementation = new DiscordStrategy({
    clientID: DISCORD_CLIENT_ID,
    clientSecret: DISCORD_CLIENT_SECRET,
    callbackURL: DISCORD_CALLBACK_URL,
    scope: ['identify', 'email', 'guilds', 'guilds.join']
}, function (accessToken, refreshToken, profile, cb) {
    const user = {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        guilds: profile.guilds.map(guild => guild.name),
        type: 'LOGGED IN WITH DISCORD'
    }

    cb(null, user)
})

module.exports = {
    DiscordStrategyImplementation
}