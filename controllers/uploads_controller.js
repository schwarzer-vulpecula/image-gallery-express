const Entry = require('../models/entry');
const sizeOf = require('image-size');
const fs = require('fs');

const squish = function (string){
  return string.replace(/\s+/g,' ').trim();
}

exports.upload_get = function (req, res){
  res.render('upload', { title: 'Upload an Image' } );
}

exports.upload_post = function (req, res){
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
    // Create and save a new entry
    const entry = new Entry({ image_name: req.file.filename, original_name: squish(req.file.originalname), description: squish(req.body.description), public_image: req.body.public_image });
    entry.save().then(() => console.log('Entry successfully created'));
    const url = '../gallery/' + req.file.filename;
    res.redirect(url);
  }
}
