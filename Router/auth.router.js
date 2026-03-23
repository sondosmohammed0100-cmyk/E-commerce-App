const express=require('express');
const router=express.Router();
const {register,login,logout}=require('../Authentication/auth');

const uploadImages=require('../Middelware/UploadImages')

router.post('/register',uploadImages,register);
router.post('/login',login);


module.exports=router
