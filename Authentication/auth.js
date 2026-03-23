const User = require('../Models/Users');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { RegisterSchema, LoginSchema } = require('../Validation/authValidation');

const register = async (req, res,next) => {
    try {


        const { error, value } = RegisterSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true

        });
        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            })
        };
        const { name, email,role,password } = value
        // check if user already exist in database 
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({
                msg: "User already Exist"
            })

        }
        if (!req.file)
            return res.status(400).json({
                msg: " profile Image is required"
            })


        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password:hashPassword,
            ProfileImage: req.file.path,
            role

        });
        res.status(201).json({
            msg: "success",
            UserInfo: newUser
        });

    }
    catch (error) {
       next(error)
    }

}
const login = async (req, res,next) => {
    try {
        //using joi validate to secure data from client
        const { error, value } = LoginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true

        });
        if (error) {
            return res.status(400).json({
                msg: error.details.map((err) => err.message)
            })

        };

        const { email, password } = value;
        const user = await User.findOne({ email });
        //check if user not found in DB
        if (!user)
            return res.status(400).json({
                msg: "Please Create Account first"
            });
        //Compare password from body and hashed password stord in DB
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword)
            return res.status(400).json({
                msg: "Invalid Password"
            });

        const token = JWT.sign(
            {
                id: user._id,
                role: user.role

            },
            process.env.SK_KEY,
            {
                expiresIn: "30d"
            })

        return res.status(200).json({
            msg: "success",
            Token: token
        })


    }
    catch (error) {
        next(error)

    }

}

module.exports = { register, login };


