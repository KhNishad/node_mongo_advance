const mongoose = require('mongoose');

// Define Order Schema
const orderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: {  type: String, required: true },
    },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, default: 'Pending' },  // e.g., Pending, Shipped, Delivered
    createdAt: { type: Date, default: Date.now }
});

// Calculate totalAmount based on product prices and quantities
orderSchema.pre('save', function (next) {
    const order = this;
    order.totalAmount = order.products.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
    next();
});

// Create Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
