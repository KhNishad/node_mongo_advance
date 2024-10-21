const mongoose  = require("mongoose")

const customerSchema = new mongoose.Schema({

    name : {
        type :String,
        required: [true, "Name is Required"]
    },
    phone:{
        type: String,
        required: [true, "Phone Number is Required"],
        minlength:11,
        unique :true
    },
    address : {
        type :String,
    },
},
{
    timestamps:true
}
)


const Customer = mongoose.model('customer',customerSchema)

module.exports = Customer;