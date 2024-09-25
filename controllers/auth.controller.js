const Users = require('../models/users.model')
const jwt = require('jsonwebtoken')

const maxAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id,name:'nishad'},'mysecret',{expiresIn:maxAge})
}



const signUpPost =  async (req,res)=>{
  
    const {email ,password} = req.body
    try {
        const users = await Users.create({email,password})
        const token = createToken(users._id)
        res.cookie('token',token,{httpOnly:true})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}  

const signUpGet =  async (req,res)=>{
    // try {
    //     const product = await Product.create(req.body)
    //     res.status(200).json(product)
    // } catch (error) {
    //     res.status(500).json({message:error.message})
    // }
    res.send('got it ')
}


const loginGet =  async (req,res)=>{
  
  
}


const loginPost =  async (req,res)=>{
    
    const {email,password} = req.body    
  
    try {
       
        const user  = await Users.login(email,password)
        const token = createToken(user._id)
        res.cookie('token',token,{httpOnly:true})
        res.status(200).json(token)

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


const logout =  async (req,res)=>{
      
    try {
       
        res.cookie('token','',{httpOnly:true},{maxAge:1})
        res.status(200).json('Logout Successfully')

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}




module.exports = {
    signUpGet,
    signUpPost,
    loginGet,
    loginPost,
    logout
}
