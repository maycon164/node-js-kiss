const onlyGoogleUser = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.json('you need to make login')
    }

    if (user.type.includes('GOOGLE')) next()

    return res.json('you need to make login with google')
}

module.exports = {
    onlyGoogleUser
}