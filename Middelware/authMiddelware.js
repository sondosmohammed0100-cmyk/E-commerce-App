//require jwt
const JWT = require('jsonwebtoken')

//get token from header
const authMiddelware = async (req, res, next) => {
try{
    const authtoken = await req.headers.authorization;
    if (!authtoken) {
        return res.status(401).json({
            msg: "Token is required or unauthorized"
        })
    }
    //split to get token value
    const token = authtoken.split(" ")[1]
    //verify tokn
    const payload = JWT.verify(token, process.env.SK_KEY)
    console.log(payload)
    if (payload.role !== "admin") {
        return res.status(403).json({
            msg: "Forbidden you are not admin"
        })
    }
  
    
    next()
}
catch(error){
    return res.status(401).json({
        msg: "Token is invalid"
    })
}
}
module.exports = authMiddelware;

