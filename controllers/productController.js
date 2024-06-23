
const { Router } = require('express')
const productService = require('../services/productService')

const router = Router()



router.get('/', (req, res) => {
    let products = productService.getAll()

    
    res.render('home', { title: 'Browse', products })
})

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' })
})


router.post('/create', (req, res) => {
    // Validate inputs if needed

    productService.create(req.body)

    res.redirect('/products')

})

router.get('/details/:productId', (req, res) => {
    res.render('details', { title: 'Product Details' })
})
module.exports = router