const LocalStrategy = require('passport-local');

const users = [{
    name: 'Maycon Huanca',
    email: 'mayconfelipe164@gmail.com',
    password: 'password12345'
}]

const LocalStrategyImplementation = new LocalStrategy(
    function (username, password, done) {
        console.log('running this peace of code!!!')
        const validUser = users.find(u => u.email === username && u.password === password);

        if (validUser) {
            done(null, {
                ...validUser,
                type: 'LOGGED IN WITH LOCAL STRATEGY'
            })
        } else {
            done(null, false, { message: 'crendetials not valid' })
        }
    }
)

module.exports = {
    LocalStrategyImplementation
}