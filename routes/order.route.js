const express = require('express')
const router = express.Router()
const { requireAuth} = require('../middleware/authMIddleware')
const {createOrder,getallOrder,getCustomerWiseOrder,getSingleOrderView} = require('../controllers/order.controller')

router.post('/create-order',requireAuth,createOrder)
router.get('/get-orders',requireAuth,getallOrder)
router.get('/get-customer-orders/:id',requireAuth,getCustomerWiseOrder)
router.get('/single-view/:id',requireAuth,getSingleOrderView)







module.exports = router