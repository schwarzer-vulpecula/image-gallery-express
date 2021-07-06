const Entry = require('../models/entry');

const squish = function (string){
  return string.replace(/\s+/g,' ').trim();
}

exports.upload_get = function (req, res){
  res.render('upload', { title: 'Upload an Image' } );
}

exports.upload_post = function (req, res){
  const entry = new Entry({ image_name: req.file.filename, original_name: squish(req.file.originalname), description: squish(req.body.description), public_image: req.body.public_image });
  entry.save().then(() => console.log('Entry successfully created'));
  const url = '../gallery/' + req.file.filename;
  res.redirect(url)
}
