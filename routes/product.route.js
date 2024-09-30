const express = require('express')
const router = express.Router()
const { requireAuth} = require('../middleware/authMIddleware')
const {createProduct,deleteProudct,getAllProducts,getSingleProduct,updateProduct} = require('../controllers/product.controller')

router.post('/',requireAuth,createProduct)
router.put('/:id',requireAuth,updateProduct)
router.get('/all',getAllProducts)
router.get('/:id',requireAuth,getSingleProduct)
router.delete('/:id',requireAuth,deleteProudct)



module.exports = router