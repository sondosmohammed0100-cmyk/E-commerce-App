const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads')
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1000);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload.array("images", 50);