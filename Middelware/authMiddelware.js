//require jwt
const JWT = require('jsonwebtoken')
const { uploadImages } = require('../Middelware/UploadImages')
//get token from header
const authMiddelware = async (req, res, next) => {
    try {

        const authtoken = await req.headers.authorization;
        if (!authtoken) {
            return res.status(401).json({
                msg: "Token is required or unauthorized"
            })
        }
        if (!authtoken.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Invalid token format" });
        }
        //split to get token value
        const token = authtoken.split(" ")[1]
        //verify tokn
        const payload = JWT.verify(token, process.env.SK_KEY)
        console.log(payload)
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(401).json({
            msg: "Token is invalid"
        })
    }
}
module.exports = authMiddelware;

