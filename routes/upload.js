const express = require('express');
const router = express.Router();
const sjcl = require('sjcl');
const sizeOf = require('image-size');
const fs = require('fs');

// Controller modules
const uploads_controller = require('../controllers/uploads_controller');

// Multer
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/');
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(file.originalname + Date.now())) + '.' + extension);
  }
})

const imageFileFilter = (req, file, cb) =>{
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { // If the file uploaded is not of these types
      return cb(null, false);
  }
  cb(null, true)
};
 
const upload = multer({ storage: storage, fileFilter: imageFileFilter, limits: { fileSize: 8000000 } })

// Routes
router.get('/', uploads_controller.upload_get)
router.post('/', upload.single('upload'), function(req, res, next) {
  let failed = false;
  if(!req.file) {
    // Multer did not upload because the file filter failed
    failed = true;
  }
  else{
    // Try checking for the dimensions of the image, to check whether or not the file is truly an image
    try {
      sizeOf('tmp/' + req.file.filename);
    }
    catch(err) {
      failed = true;
    }
  }
  if (failed) {
    // The upload failed, we now need to delete the file in the tmp folder if it exists
    if(req.file){
      fs.unlinkSync('tmp/' + req.file.filename);
    }
    res.render('upload_error', { title: 'Error' });
  }
  else {
    // The upload was successful, we need to move the image to the public/uploads folder
    fs.renameSync('tmp/' + req.file.filename, 'public/uploads/' + req.file.filename);
    uploads_controller.upload_post(req, res);
  }
});

module.exports = router;
