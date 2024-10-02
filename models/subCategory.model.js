const mongoose  = require("mongoose")


const subCategorySchema = new mongoose.Schema({

    name : {
        type :String,
        required:true,
        unique:true,
    },
    isParent:{
        type: Boolean,
        required:true,
    },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
},
{
    timestamps:true
}
)

const SubCategory = mongoose.model('subCategory',subCategorySchema)

module.exports = SubCategory;