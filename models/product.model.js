const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product Name is Required"]
        },
        sku: {
            type: String,
            required: true
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
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'brand',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: [true, "Category is Required"]
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subCategory',
            default: null
        },
        subSubCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subSubCategory',
            default: null
        },

    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product