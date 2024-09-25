const mongoose  = require("mongoose")
const {isEmail} = require('validator')
 const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    email : {
        type :String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter valid email']
    },
    password:{
        type: String,
        required:true,
        minlength:3
    }
},
{
    timestamps:true
}
)

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

// static login method

userSchema.statics.login = async function(email,password){
    const user  = await this.findOne({email})
    if(user){
       let auth = await bcrypt.compare(password,user.password)
       if(auth){
        return user
       }
       throw Error("Incorrect  Password");
       
    }
    throw Error('Incorrect Email ')
}

const User = mongoose.model('user',userSchema)

module.exports = User;