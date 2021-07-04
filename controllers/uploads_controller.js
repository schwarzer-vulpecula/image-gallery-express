const Entry = require('../models/entry');

exports.upload_get = function (req, res){
  res.render('upload');
}

exports.upload_post = function (req, res){
  const entry = new Entry({ image_name: req.file.filename, description: req.body.description });
  entry.save().then(() => console.log('Entry successfully created'));
  const url = '../gallery/' + req.file.filename;
  res.redirect(url)
}
