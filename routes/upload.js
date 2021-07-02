const express = require('express');
const router = express.Router();

// Controller modules
const uploads_controller = require('../controllers/uploads_controller')

// Multer
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})
 
const upload = multer({ storage: storage })

// Routes
router.get('/', uploads_controller.upload_get)
router.post('/', upload.single('upload'), function(req, res) {
  res.send("File uploaded.");
});

module.exports = router;
