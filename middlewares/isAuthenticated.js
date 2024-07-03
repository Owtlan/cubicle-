module.exports = (req, res, next) => {
    // let cookieToken = req.cookies.USER_SESSION


    if (!req.user) {
        return res.redirect('/auth/login')
    }

    next()
}