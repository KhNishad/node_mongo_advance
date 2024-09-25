const express = require('express')
const router = express.Router()
const {signUpGet,signUpPost,loginGet,loginPost,logout} = require('../controllers/auth.controller')
const { requireAuth} = require('../middleware/authMIddleware')
router.post('/signUp',signUpPost)
router.get('/login',loginGet)
router.post('/login',requireAuth,loginPost)
router.get('/signUp',signUpGet)
router.get('/logout',logout)





module.exports = router