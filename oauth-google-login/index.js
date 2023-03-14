const express = require('express');
const session = require('express-session')
const { redisStore } = require('./services/RedisStoreSession');
const { GoogleStrategyImplementation } = require('./strategys/GoogleStrategy')
const { LocalStrategyImplementation } = require('./strategys/LocalStrategy');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    name: 'session.id',
    resave: false,
    saveUninitialized: true,
    secret: 'Secrete-session',
    store: redisStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));

// workaround skipping problems with oauth library
require('https').globalAgent.options.rejectUnauthorized = false;

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

// save user in req.session
passport.serializeUser((user, cb) => {
    cb(null, user);
})
// check req.session and fills req.user
passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})


passport.use(GoogleStrategyImplementation);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/auth/google/redirects', passport.authenticate('google', { failureRedirect: '/error' }), (req, res) => {
    res.redirect('/success')
})

passport.use(LocalStrategyImplementation);
app.post('/auth/login', passport.authenticate('local', { failureRedirect: '/verify', successRedirect: '/success' }),
    (req, res) => {
        console.log(req.user);
        return res.redirect('/success')
    }
)

app.get('/success', (req, res) => {
    console.log('REQ SESSION: ', JSON.stringify(req.session));
    console.log(`REQ USER: ${JSON.stringify(req.user)}`)
    res.json({ message: 'login flow it was successfull' }).status(200);
})

app.get('/verify', (req, res) => {
    console.log(req.session)
    console.log(req.sessionID)
    console.log(req.sessionStore)

    if (req.user) {
        return res.json({
            message: 'you are logged in as ' + req.user.name,
            login: req.user.type
        }).status(200)
    }

    return res.json({ message: 'your session does not exist!!!' })
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.statusCode(500)
        return res.json({ message: 'you was logout' })
    })
})

app.listen(5500, () => {
    console.log('App running on port 5500')
    console.log('Control + C to stop')
})