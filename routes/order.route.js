const express = require('express')
const router = express.Router()
const { requireAuth} = require('../middleware/authMIddleware')
const {createOrder,getallOrder} = require('../controllers/order.controller')

router.post('/create-order',requireAuth,createOrder)
router.get('/get-orders',requireAuth,getallOrder)





module.exports = router