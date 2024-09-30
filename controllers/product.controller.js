const Product = require('../models/product.model')
const path = require('path');
const fs = require('fs')

function generateDynamicName(baseName) {
    const timestamp = Date.now(); // Get current timestamp in milliseconds
    return `${baseName}_${timestamp}`;
}

// create product
const createProduct =  async (req,res)=>{
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ error: 'Image data or name missing!' });
    }
    
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const imageName = generateDynamicName('product')
    const mimeMatch = image.match(/^data:image\/(\w+);base64,/);
    const imageExtension = mimeMatch ? mimeMatch[1] : 'png'; 

    const imagePath = path.join('public', `${imageName}.${imageExtension}`).replace(/\\/g, '/');
    
    fs.writeFileSync(imagePath, buffer);
    
    
    try {
        req.body.image = imagePath
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// get all products
const getAllProducts =  async (req,res)=>{
  
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


// get single product
const getSingleProduct =  async (req,res)=>{
  
    try {
        const {id} = req.params
        let product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// update product 
const updateProduct =  async (req,res)=>{
  
    try {
        const {id} = req.params
        let product = await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        let updatedproduct = await Product.findById(id)
        res.status(200).json(updatedproduct)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// delete product
const deleteProudct = async (req,res)=>{
  
    try {
        const {id} = req.params
        let product = await Product.findByIdAndDelete(id)

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        res.status(200).json({message:'Deleted Successfully'})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProudct
}
