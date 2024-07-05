const router = require('express').Router()
const authService = require('../services/authService')
const validator = require('validator')
const { body, validationResult } = require('express-validator')

const isAuthenticated = require('../middlewares/isAuthenticated')

const isGuest = require('../middlewares/isGuest')

router.get('/login', isGuest, (req, res) => {
    res.render('login')
})

router.post('/login', isGuest, async (req, res) => {

    const { username, password } = req.body


    try {
        let token = await authService.login({ username, password })

        res.cookie('USER_SESSION', token)
        res.redirect('/products')
    } catch (error) {
        res.render('login', { error });
    }
})


router.get('/register', isGuest, (req, res) => {
    res.render('register')
})


const isStrongPasswordMiddleware = (req, res, next) => {
    let password = req.body.password

    let isStrongPassword = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })


    if (!isStrongPassword) {
        return res.render('register', { error: { message: 'You should have strong password' }, username: req.body.username })
    }

    next()
}

router.post('/register', isGuest,
    body('email', 'Your email is not valid').isEmail().normalizeEmail(),
    // isStrongPasswordMiddleware,
    body('username', 'Specify username').notEmpty(),
    body('password', 'Password to short').isLength({ min: 5 }),
    async (req, res) => {
        const { username, password, repeatPassword } = req.body

        if (password !== repeatPassword) {
            return res.render('register', { message: 'Password missmatch!' })
        }

        let errors = validationResult(req);
        if (errors.errors.length > 0) {

            return res.render('register', errors)
        }
        try {
            let user = await authService.register({ username, password })

            res.redirect('/auth/login')
        } catch (error) {
            res.render('register', { error })
        }
    })

router.get('/logout', isAuthenticated, (req, res) => {

    res.clearCookie('USER_SESSION')
    res.redirect('/products')
})

module.exports = router;