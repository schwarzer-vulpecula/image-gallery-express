const express = require('express');
const router = express.Router();
const sjcl = require('sjcl');

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
router.post('/', upload.single('upload'), function(req, res) {
  uploads_controller.upload_post(req, res);
});

module.exports = router;
