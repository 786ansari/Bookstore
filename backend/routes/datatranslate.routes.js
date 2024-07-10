const express = require("express")
const router = express.Router();
const dataTranslateService = require("../services/datatranslateService");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Set the filename to the original filename
    }
  });
  const upload = multer({ storage });

router.post("/addDataTranslateFormDetails",upload.single('file'),dataTranslateService.add)

module.exports = router