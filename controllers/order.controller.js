const Order = require('../models/order.model')
const path = require('path');
const fs = require('fs')


const createOrder = async (req, res) => {
    
    try {
        let order = await Order.create(req.body)
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


const getallOrder = async (req, res) => {
    
    try {
        let orders = await Order.find({}).populate('products.productId') 
        
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = {
    createOrder,
    getallOrder
}