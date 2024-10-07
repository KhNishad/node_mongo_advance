const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product Name is Required"]
        },
        price: {
            type: Number,
            required: [true, "Price is Required"]
        },
        qty: {
            type: Number,
            required: [true, "Qty is Required"]
        },
        image: {
            type: String,
            required: [true, "Image is Required"]
        },
        category: {
            type: String,
            required: [true, "Category is Required"]
        },
        SubCategory: {
            type: String,
        },
        
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model("Product",ProductSchema)
module.exports = Product