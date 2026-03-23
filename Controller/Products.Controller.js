const Products = require('../Models/Products')
const ProductShema = require('../Validation/productValidation')
const AppError = require('../utils/AppError');
const getAllProduct = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const getProduct = await Products.find()
            .populate("categoryId", "name")
            .populate("createdBy", "name email")
            .skip(skip)
            .limit(limit);
        if (getProduct.length === 0) {
            return res.status(404).json({
                msg: "No Product Found"
            })
        }
        return res.status(200).json({
            msg: "success",
            Products: getProduct
        })

    }
    catch (error) {
        next(error)

    }

}
const getProductById = async (req, res, next) => {
    try {
        const getProductById = await Products.findById(req.params.id)
            .populate("categoryId", "name")
            .populate("createdBy", "name email");
        if (!getProductById) {
            return res.status(404).json({
                msg: "Product Not Found"
            })
        }
        return res.status(200).json({
            msg: "success",
            Product: getProductById
        })
    }
    catch (error) {
        next(error)
    }
}
const createProduct = async (req, res, next) => {
    try {
        const { error, value } = ProductShema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        if (error) {
            return next(new AppError(error.details[0].message, 400));
        }
        const { name, description, price, categoryId } = value;

        //check if Product already exists in database
        const existingProduct = await Products.findOne({ name })
        if (existingProduct) {
            return res.status(409).json({
                msg: "Product Already Exists"
            })
        }
        if (error) {
            return next(new AppError(error.details[0].message, 400));
        }
        if (!req.files || req.files.length === 0) {
            return next(new AppError("Images are required", 400));
        }

        
        const images = req.files.map(file => `/images/${file.filename}`);
        const newProduct = await Products.create({
            name,
            description,
            price,
            image: images,
            categoryId,
            createdBy: req.user.id
        });

        return res.status(201).json({
            msg: "success",
            Product: newProduct
        })
    } catch (error) {
        next(error)
    }

}
const updateProduct = async (req, res, next) => {
    try {
        const { error, value } = ProductShema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        if (error) {
            return next(new AppError(error.details[0].message, 400));
        }
        if (req.files && req.files.length > 0) {
            value.image = req.files.map(file => file.path);
        }
        const updateProduct = await Products.findByIdAndUpdate(
            req.params.id,
            { $set: value },
            { new: true }
        );
        if (!updateProduct) {
            return res.status(404).json({
                msg: "Product Not Found"
            })
        }
        return res.status(200).json({
            msg: "success",
            Product: updateProduct
        })
    }
    catch (error) {
        next(error)
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const deleteProduct = await Products.findByIdAndDelete(req.params.id)
        if (!deleteProduct) {
            return res.status(404).json({
                msg: "Product Not Found"
            })
        }
        return res.status(200).json({
            msg: "Product Deleted"
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
