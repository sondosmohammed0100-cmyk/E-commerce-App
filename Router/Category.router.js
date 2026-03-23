const {getAllCategory,getCategoryById,createCategory,updateCategory,deleteCategory} = require('../Controller/Category.Controller');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../Middelware/authMiddelware');
const isAdmin = require('../Middelware/isAdmin');

router.get('/', authMiddelware ,getAllCategory);
router.get('/:id',authMiddelware ,getCategoryById);

//isAdminMiddelware on create and update and delete for admin only 
router.post('/', authMiddelware, isAdmin,createCategory);
router.put('/:id', authMiddelware,isAdmin ,updateCategory);
router.delete('/:id', authMiddelware,isAdmin ,deleteCategory);


module.exports = router;