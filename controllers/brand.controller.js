const Brand = require('../models/brand.model')
const Product = require('../models/product.model')
const { createSlug } = require('../helpers/helperFunctions')

const createBrand = async (req, res) => {
    req.body.slug = createSlug(req.body.name)

    try {
        let brand = await Brand.create(req.body)
        if (brand) {
            res.status(200).json({
                data: brand,
                success: true,
                message: 'Brand Created Successfully'
            })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}

const getAllBrands = async (req, res) => {
    try {
        let brands = await Brand.find()
        if (brands) {
            res.status(200).json({
                data: brands,
                success: true,
                message: 'Brand Created Successfully'
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getBrandBySlug = async (req, res) => {
    const { id } = req.params
    try {
        let brands = await Brand.findOne({ slug: id })
        if (brands) {
            return res.status(200).json({
                data: brands,
                success: true,
                message: 'View Successfully'
            })
        } else {
            return res.status(400).json({
                data: null,
                success: false,
                message: 'No Brands Found'
            })
        }
    } catch (error) {
        res.status(500).json({
            data: null,
            success: true,
            message: error.message
        })
    }
}

const deleteBrand = async (req, res) => {
    try {

        const associatedProducts = await Product.findOne({ brand: req.params.id });
        if (associatedProducts) {
            return res.status(400).json({
                data: null,
                success: false,
                message: 'Cannot delete brand. It is associated with existing products.'
            });
        }

        let brand = await Brand.deleteOne({ _id: req.params.id })
        if (brand) {
            return res.status(200).json({
                data: null,
                success: true,
                message: 'Brand Deleted Successfully'
            })
        } else {
            return res.status(400).json({
                data: null,
                success: false,
                message: 'Brand Not Found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createBrand,
    getAllBrands,
    getBrandBySlug,
    deleteBrand
}