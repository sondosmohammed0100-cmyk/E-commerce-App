const { getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct } = require('../Controller/Products.Controller');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../Middelware/authMiddelware');
const isAdmin = require('../Middelware/isAdmin');
const uploadProducts=require('../Middelware/uploadProducts')



router.get('/', authMiddelware,getAllProduct);
router.get('/:id',authMiddelware, getProductById);

//IsAdmin Middelware on create and update and delete for admin only 
router.post('/', authMiddelware, isAdmin, uploadProducts,createProduct);
router.put('/:id', authMiddelware, isAdmin,uploadProducts ,updateProduct);
router.delete('/:id', authMiddelware, isAdmin, deleteProduct);
module.exports = router;