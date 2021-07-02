const Entry = require('../models/entry');

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })

exports.upload_get = function (req, res){
    res.send('NOT IMPLEMENTED: Get Upload');
}

exports.upload_post = function (req, res){
    res.send('NOT IMPLEMENTED: Post Upload');
}
