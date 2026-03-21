const {getAllCategory,getCategoryById,createCategory,updateCategory,deleteCategory} = require('../Controller/Category.Controller');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../Middelware/authMiddelware');

router.get('/',  getAllCategory);
router.get('/:id', getCategoryById);
//authMiddelware on create and update and delete for admin only 
router.post('/', authMiddelware, createCategory);
router.put('/:id', authMiddelware, updateCategory);
router.delete('/:id', authMiddelware, deleteCategory);
module.exports = router;