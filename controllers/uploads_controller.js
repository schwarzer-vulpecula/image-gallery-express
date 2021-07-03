const Entry = require('../models/entry');

exports.upload_get = function (req, res){
  res.render('upload');
}

exports.upload_post = function (req, res){
  res.end('Uploaded successfully')
}
