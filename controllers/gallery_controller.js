const Entry = require('../models/entry');

exports.gallery_index = function (req, res){
  res.send('NOT IMPLEMENTED: Entry index');
}

exports.gallery_show = function (req, res){
  Entry.findOne({ image_name: req.params.id })
    .exec(function (err, entry) {
      if (entry==null) { // No results.
        res.render('gallery_error');
        return;
      }
      // Successful, so render.
      console.log(entry.image_name);
      // Change the date to a more readable format
      const formattedDate = entry.createdAt.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
      res.render('gallery_show', { entry: entry, time: formattedDate });
    })
}
