const isAuthenticated = (req, res, next) => {

    if (req.user) return next();

    return res.json({ message: 'you need to be authenticated to see this....' });
}

module.exports = {
    isAuthenticated
}