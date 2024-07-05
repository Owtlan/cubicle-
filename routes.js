const { Router } = require('express')


const isGuest = require('./middlewares/isGuest')

const productController = require('./controllers/productController')
const accessoryController = require('./controllers/accessoryController')
const homeController = require('./controllers/homeController')
const authControler = require('./controllers/authController')

const router = Router()



router.use('/', homeController)
router.use('/auth', authControler)
router.use('/products', productController)
router.use('/accessories', accessoryController)
router.get('*', (req, res) => {
    res.render('404')
})



module.exports = router