const Brand = require('../models/brand.model')
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

const getAllBrands = async (req,res)=>{
   try {
    let brands = await Brand.find()
    if(brands){
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

const getBrandBySlug = async (req,res)=>{
    const {id}  = req.params
    try {
     let brands = await Brand.findOne({slug:id})
     if(brands){
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

module.exports = {
    createBrand,
    getAllBrands,
    getBrandBySlug
}