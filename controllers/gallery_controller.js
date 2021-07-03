const Entry = require('../models/entry');

exports.gallery_index = function (req, res){
  res.send('NOT IMPLEMENTED: Entry index');
}

exports.gallery_show = function (req, res){
  res.send('NOT IMPLEMENTED: Entry detail: ' + req.params.id);
}
