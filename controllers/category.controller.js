const Category = require('../models/category.model')
const SubCategory = require('../models/subCategory.model')
const SubSubCategory = require('../models/subSubCategory.model')

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
        let categories = await Category.aggregate([
            {
                $lookup: {
                    from: "subcategories",                     // Reference to the subcategories collection
                    localField: "_id",                        // Match the Category _id
                    foreignField: "parentCategory",           // Reference field in subcategories
                    as: "subCategoryList"                     // Output field for matched subcategories
                }
            },
            {
                $unwind: {
                    path: "$subCategoryList",                 // Unwind the subcategory list
                    preserveNullAndEmptyArrays: true         // Keep categories with no subcategories
                }
            },
            {
                $lookup: {
                    from: "subsubcategories",                 // Reference to the sub-subcategories collection
                    localField: "subCategoryList._id",       // Match SubCategory _id
                    foreignField: "subCategory",              // Reference field in sub-subcategories
                    as: "subCategoryList.subSubCategoryList" // Output field for matched sub-subcategories
                }
            },
            {
                $group: {
                    _id: "$_id",                              // Group by the Category _id
                    name: { $first: "$name" },                // Include category name
                    subCategoryList: { $push: {               // Collect all subcategories and their sub-subcategories
                        name: "$subCategoryList.name",
                        _id: "$subCategoryList._id",
                        subSubCategoryList: "$subCategoryList.subSubCategoryList"
                    }}
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    subCategoryList: 1                       // Include the complete subcategory list with sub-subcategories
                }
            }
        ]);
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const singleCategoryView = async (req, res) => {
    const { id } = req.params
    try {
        let category = await Category.findById(id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const createSubCategory = async (req, res) => {
    const { parentCategory } = req.body
    try {
        let findParent = await Category.findById(parentCategory)
        if (findParent) {
            let category = await SubCategory.create(req.body)
            res.status(200).json(category)
        } else {
            res.status(400).json({ message: 'Parent Category Not found' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const subCategoryList = async (req, res) => {

    try {
        let subCategories = await SubCategory.aggregate([
            {

                $lookup: {
                    from: 'categories',                   
                    localField: 'parentCategory',         
                    foreignField: '_id',                  
                    as: 'parentCategoryInfo'            
                }
            },

            {
                $lookup: {
                    from: 'subsubcategories',
                    localField: '_id',
                    foreignField: 'subCategory',
                    as: 'subSubCategories'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    subCategoryList: 1                       // Include the complete subcategory list with sub-subcategories
                }
            }
        ])
        res.status(200).json(subCategories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const createSubSubCategory = async (req, res) => {
    const { parentCategory, subCategory } = req.body
    try {
        let findParent = await Category.findById(parentCategory)
        let findSubParent = await SubCategory.findById(subCategory)

        if (findParent && findSubParent) {
            let category = await SubSubCategory.create(req.body)
            res.status(200).json(category)
        } else {
            res.status(400).json({ message: 'Parent Categories Not found' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const subSubCategoryList = async (req, res) => {

    try {
        let subCategories = await SubSubCategory.find({}).populate('parentCategory').populate('subCategory')
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
    subCategoryList,
    createSubSubCategory,
    subSubCategoryList
}