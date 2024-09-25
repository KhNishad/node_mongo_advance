const express = require('express')
const Product = require('../models/product.model')


// create product
const createProduct =  async (req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
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
