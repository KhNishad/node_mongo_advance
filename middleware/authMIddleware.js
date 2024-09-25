const jwt = require ('jsonwebtoken') 


const requireAuth  = (req,res,next)=>{
 
    const token = req.cookies.token

    if(token){
      jwt.verify(token,'mysecret', (err,decodedToken)=>{
        if(err){
            res.redirect('/login')
            console.log('..eror',err);
        }else{
            console.log('............login');
            next()
        }
      })
    }else{
        next()
        console.log('............not login');

    }
}

module.exports = {requireAuth}