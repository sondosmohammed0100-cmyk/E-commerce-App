const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: false
    },
    ProfileImage:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{ timestamps: true});
const User = mongoose.model('User', userSchema);
module.exports = User;  