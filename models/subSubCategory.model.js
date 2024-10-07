const mongoose  = require("mongoose")


const subSubCategorySchema = new mongoose.Schema({

    name : {
        type :String,
        required:true,
        unique:true,
    },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subCategory', required: true },

},
{
    timestamps:true
}
)

const SubSubCategory = mongoose.model('subSubCategory',subSubCategorySchema)

module.exports = SubSubCategory;