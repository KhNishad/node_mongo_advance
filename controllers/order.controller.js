const Order = require('../models/order.model')
const Customer = require('../models/customer.model')
const Product = require('../models/product.model')
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
        if (existingCustomer) {
            customerId = existingCustomer?._id
        } else {
            const customerRes = await Customer.create([customer], { session });
            customerId = customerRes[0]?._id
        }

        // Attach customer ID to order
        const orderData = {
            ...req.body,
            customerId: customerId
        };

        let total = req.body.products.reduce((ac, it) => ac + it.price, 0);

        if (total != req.body.totalAmount) {
            return res.status(400).json({
                message: 'Total Price is not Matching',
                success: false
            })
        }

        // Create the order
        const order = await Order.create([orderData], { session });

        // update order count
        await Promise.all(
            req.body.products.map(item =>
                Product.updateOne(
                    { _id: item?.productId },
                    { $inc: { orderCount: item?.quantity } },
                    { session }
                )
            )
        );

        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        return res.status(201).json({ data: order, success: true, message: "Order Created Success" });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ data:null,success:false,message: error.message });
    }

}

const getallOrder = async (req, res) => {

    try {
        let orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'customers', // The collection containing customer data
                    localField: 'customerId', // The field in the Order collection to match
                    foreignField: '_id', // The field in the Customer collection to match
                    as: 'customerInfo' // The name of the field to store the joined customer data
                }
            },
            {
                $unwind: '$products' // Unwind the products array so we can join on each productId
            },
            {
                $lookup: {
                    from: 'products', // The collection containing customer data
                    localField: 'products.productId', // The field in the Order collection to match
                    foreignField: '_id', // The field in the Customer collection to match
                    as: 'productInfo' // The name of the field to store the joined customer data
                }
            },
            {
                $project: {
                    customerId: 0
                }
            },

            {
                $group: {
                    _id: '$_id', // Group by order _id
                    products: {
                        $push: {
                            price: '$products.price',
                            quantity: '$products.quantity',
                            productInfo: {
                                name: { $first: '$productInfo.name' },  // Use $first to get single value
                                price: { $first: '$productInfo.price' },
                                sku: { $first: '$productInfo.sku' },
                                slug: { $first: '$productInfo.slug' }
                            }
                        }
                    },
                    customerInfo: { $first: '$customerInfo' }, // Take the first customerInfo
                    totalAmount: { $first: '$totalAmount' }, // Keep the totalAmount field
                    orderStatus: { $first: '$orderStatus' }, // Keep the orderStatus field
                    createdAt: { $first: '$createdAt' } // Keep the createdAt field
                }
            },
            {
                $project: {
                    // Exclude fields within customerInfo
                    'customerInfo.updatedAt': 0,
                    'customerInfo.createdAt': 0,
                    'customerInfo.__v': 0,
                }
            }

        ]);

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getCustomerWiseOrder = async (req, res) => {
    const { id } = req.params

    try {
        let orders = await Order.find({ customerId: id }).populate('customerId').populate('products.productId');
        res.status(200).json({
            data: orders,
            message: 'Customer wise order list',
            success: true
        })
    } catch (error) {
        res.status(400).json({
            data: null,
            message: 'Something went wrong',
            success: false
        })
    }



}

const getSingleOrderView = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id)
            .populate('customerId')
            .populate('products.productId')
            .exec();

        if (order) {

            res.status(200).json({
                data: order,
                message: 'Single Order View',
                success: true
            });
        } else {
            res.status(404).json({
                data: null,
                message: 'Order not found',
                success: false
            });
        }
    } catch (error) {
        res.status(400).json({
            data: null,
            message: error.message,
            success: false
        });
    }
};


module.exports = {
    createOrder,
    getallOrder,
    getCustomerWiseOrder,
    getSingleOrderView
}