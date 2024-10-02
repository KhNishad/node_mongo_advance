const Category = require('../models/category.model')
const SubCategory = require('../models/subCategory.model')


const createCategory = async (req, res) => {
    
    try {
        let category = await Category.create(req.body)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const categoryList = async (req, res) => {
    
    try {
        let categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const singleCategoryView = async (req, res) => {
     const {id} = req.params
    try {
        let category = await Category.findById(id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const createSubCategory = async (req, res) => {
     const {parentCategory} = req.body     
    try {
        let findParent = await Category.findById(parentCategory)
        if(findParent){
            let category = await SubCategory.create(req.body)
            res.status(200).json(category)
        }else{
            res.status(400).json({message:'Parent Category Not found'})
        }
       
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const subCategoryList = async (req, res) => {
    
    try {
        let subCategories = await SubCategory.find({}).populate('parentCategory')
        res.status(200).json(subCategories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = {
    createCategory,
    categoryList,
    singleCategoryView,
    createSubCategory,
    subCategoryList
}