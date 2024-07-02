const router = require('express').Router()
const authService = require('../services/authService')


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {

    const { username, password } = req.body

    try {
        let token = await authService.login({ username, password })

        res.cookie('USER_SESSION', token)
        res.redirect('/products')
    } catch (error) {
        res.render('login', { error });
    }
})


router.get('/register', (req, res) => {
    res.render('register')
})


router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body

    if (password !== repeatPassword) {
        return res.render('register', { message: 'Password missmatch!' })

    }

    try {
        let user = await authService.register({ username, password })

        res.redirect('/auth/login')
    } catch (error) {
        res.render('register', { error })
    }
})

module.exports = router;