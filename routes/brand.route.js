const express = require('express')
const router = express.Router()
const {createBrand,getAllBrands,getBrandBySlug,deleteBrand} = require('../controllers/brand.controller')
const { requireAuth} = require('../middleware/authMIddleware')



router.post('/create',requireAuth,createBrand)
router.get('/get-brands',requireAuth,getAllBrands)
router.get('/view/:id',requireAuth,getBrandBySlug)
router.delete('/delete-brand/:id',requireAuth,deleteBrand)


// router.post('/login',loginPost)
// router.get('/signUp',signUpGet)






module.exports = router