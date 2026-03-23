const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true
        
    },
    // slug:{
    //     type: String,
    //     unique:true,
    //     lowercase:true,
    //     required:true

    // },
    // Image:{
    //     secure_url:{
    //         type:String,
    //         required:true
    //     },
    //     public_id:{
    //         type:String,
    //         required:true
    //     }
    // },

    description: {
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;