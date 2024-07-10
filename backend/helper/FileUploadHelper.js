const multer = require('multer');
const path = require('path');
const uploadSingleIcon = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Set the destination folder for uploaded files
          },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
        }
    }),
    fileFilter: function (req, file, cb) {
        console.log("filefilefile")
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            throw new Error('Only images (jpeg, jpg, png) are allowed!')
        }
    },
    limits: { fileSize: 1024 * 1024 } // 1MB file size limit
}) 
module.exports = uploadSingleIcon 