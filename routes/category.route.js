const express = require('express')
const router = express.Router()
const { requireAuth} = require('../middleware/authMIddleware')
const {createCategory,categoryList,singleCategoryView,createSubCategory,subCategoryList} = require('../controllers/category.controller')

router.post('/create',requireAuth,createCategory)
router.get('/list',requireAuth,categoryList)
router.get('/view/:id',requireAuth,singleCategoryView)
router.post('/create-sub',requireAuth,createSubCategory)
router.get('/subCategory-list',requireAuth,subCategoryList)









module.exports = router