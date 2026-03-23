const category = require('../Models/Categories')
const categoryShema = require('../Validation/CategoryValidation')

const getAllCategory = async (req, res, next) => {
    try {
        // const page = req.query.page || 1;
        // const limit = 5;
        // const skip = (page - 1) * limit;
        
        const getcategory = await category
            .find()
            .populate("createdBy", "name email")
            // .skip(skip)
            // .limit(limit);
        if (getcategory.length === 0) {
            return res.status(404).json({
                msg: "No Category Found"
            })
        }
        return res.status(200).json({
            msg: "All Category",
            category: getcategory
        })

    }
    catch (error) {
        next(error)

    }

}
const getCategoryById = async (req, res, next) => {
    try {
        const getcategoryById = await category
            .findById(req.params.id)
            .populate("createdBy", "name email");
        if (!getcategoryById) {
            return res.status(404).json({
                msg: "Category Not Found"
            })
        }
        return res.status(200).json({
            msg: "Category Found",
            category: getcategoryById
        })
    }
    catch (error) {
        next(error)
    }
}
const createCategory = async (req, res, next) => {
    try {
        const { error, value } = categoryShema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        if (error) {
            return res.status(400).json({
                msg: "Validation Error",
                error: error.details.map((err) => err.message)
            })
        }
        const { name, description } = value;

        //check if category already exists in database
        const existingCategory = await category.findOne({ name })
        if (existingCategory) {
            return res.status(409).json({
                msg: "Category Already Exists"
            })
        }

        const newCategory = await category.create({
            name,
            description,
            createdBy: req.user.id
        })

        return res.status(201).json({
            msg: "Category Created",
            category: newCategory
        })
    } catch (error) {
        next(error)
    }

}
const updateCategory = async (req, res, next) => {
    try {
        const { error, value } = categoryShema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        if (error) {
            return res.status(400).json({
                msg: "Validation Error",
                error: error.details.map((err) => err.message)
            })
        }
        const { name, description, } = value;
        const updateCategory = await category.findByIdAndUpdate(
            req.params.id,
            { $set: value },// for update change only and prvent overwrite
            { new: true }
        );
        if (!updateCategory) {
            return res.status(404).json({
                msg: "Category Not Found"
            })
        }
        return res.status(200).json({
            msg: "Category Updated",
            category: updateCategory
        })
    }
    catch (error) {
        next(error)
    }
}
const deleteCategory = async (req, res, next) => {
    try {
        const deleteCategory = await category.findByIdAndDelete(req.params.id)
        if (!deleteCategory) {
            return res.status(404).json({
                msg: "Category Not Found"
            })
        }
        return res.status(200).json({
            msg: "Category Deleted"
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}