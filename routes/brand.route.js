const express = require('express')
const router = express.Router()
const {createBrand,getAllBrands,getBrandBySlug} = require('../controllers/brand.controller')
const { requireAuth} = require('../middleware/authMIddleware')



router.post('/create',createBrand)
router.get('/get-brands',getAllBrands)
router.get('/view/:id',getBrandBySlug)

// router.post('/login',loginPost)
// router.get('/signUp',signUpGet)






module.exports = router