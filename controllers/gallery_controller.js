const Entry = require('../models/entry');

exports.gallery_index = function (req, res){
  Entry.find({ public_image: true }, { image_name: 1, _id: 0 })
    .exec(function (err, entries){
        res.render('gallery_index', { entries: entries, uploads_path: 'uploads/', gallery_path: 'gallery/' });
        console.log(entries);
    });
}

exports.gallery_show = function (req, res){
  Entry.findOne({ image_name: req.params.id })
    .exec(function (err, entry) {
      if (entry==null) { // No results.
        res.render('gallery_error');
      }
      else {
        // Change the date to a more readable format
        const formattedDate = entry.createdAt.toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit"
        });
        res.render('gallery_show', { entry: entry, time: formattedDate, link: '../uploads/' + entry.image_name });
      }
    })
}
