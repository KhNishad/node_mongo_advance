const Order = require('../models/order.model')
const Customer = require('../models/customer.model')
const mongoose = require('mongoose');



const createOrder = async (req, res) => {
        const { customer, products } = req.body;
    
        // Basic validation of the request
        if (!customer || products?.length == 0) {
            return res.status(400).json({ message: 'Invalid customer or products data.' });
        }
    
        // Start transaction
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {

            // check if customer exits
            let existingCustomer = await Customer.findOne({ phone: customer.phone }).session(session);
            let customerId;
            // Create customer inside the transaction
            if(existingCustomer){
             customerId = existingCustomer?._id
            }else{
                const customerRes = await Customer.create([customer], { session });
                customerId= customerRes[0]?._id
            }
    
            // Attach customer ID to order
            const orderData = {
                ...req.body,
                customerId: customerId 
            };
            
            
            // Create the order
            const order = await Order.create([orderData], { session });
    
            // Commit transaction
            await session.commitTransaction();
            session.endSession();
    
            return res.status(201).json(order);
    
        } catch (error) {
            // Rollback in case of error
            await session.abortTransaction();
            session.endSession();
    
            console.error('Order creation failed:', error);
            return res.status(500).json({ message: error.message });
        }

}


const getallOrder = async (req, res) => {
    
    try {
        let orders = await Order.find({}).populate('customerId').populate('products.productId')
        
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = {
    createOrder,
    getallOrder
}