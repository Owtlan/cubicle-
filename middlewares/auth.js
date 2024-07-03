const jwb = require('jsonwebtoken')
const secret = 'navodohonosor'

module.exports = function () {
    return (req, res, next) => {

        let token = req.cookies.USER_SESSION

        if (token) {
            jwb.verify(token, secret, function (err, decoded) {

                if (err) {
                    res.clearCookie(token)
                } else {
                    req.user = decoded
                    res.locals.user = decoded
                    res.locals.isAuthenticated = true
                }
            })
        }

        next()
    }
}