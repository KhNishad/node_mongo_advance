const express = require('express')
const router = express.Router()
const {createProduct,deleteProudct,getAllProducts,getSingleProduct,updateProduct} = require('../controllers/product.controller')

router.post('/',createProduct)
router.put('/:id',updateProduct)
router.get('/all',getAllProducts)
router.get('/:id',getSingleProduct)
router.delete('/:id',deleteProudct)



module.exports = router