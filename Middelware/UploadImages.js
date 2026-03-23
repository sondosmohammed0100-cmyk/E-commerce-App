const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, 'Uploads')
    },

    // filename
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1000)
        cb(null, uniqueName + path.extname(file.originalname))
    }
})

const fileUpload = multer({ storage })
const uploadImages = fileUpload.single("ProfileImage")

module.exports = uploadImages