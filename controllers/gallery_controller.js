const Entry = require('../models/entry');
const url = require('url');
const imagesPerPage = 1; // Normally 15, currently using 1 for testing

number_of_pages = function(images){
  if (images == 0) { 
    return 1;
  }
  else {
    return Math.ceil(images/imagesPerPage);
  }
}

exports.gallery_index = function (req, res){
  Entry.countDocuments({ public_image: true }, function (err, count) {
    const maxPage = number_of_pages(count);
    let page = parseInt(url.parse(req.url,true).query.page);
    // Set page number if out of bounds or invalid
    if (isNaN(page)){ page = 1; }
    if (page < 1) { page = 1; }
    if (page > maxPage) { page = maxPage; }
    // Query images
    Entry.find({ public_image: true }, { image_name: 1, _id: 0 })
      .sort({ createdAt: 'desc' })
      .skip((page - 1) * imagesPerPage)
      .limit(imagesPerPage)
      .exec(function (err, entries){
          res.render('gallery_index', { title: 'Gallery', entries: entries, uploads_path: '../uploads/', gallery_path: '../gallery/', page: page, maxPage: maxPage });
      });
  });
}

exports.gallery_show = function (req, res){
  Entry.findOne({ image_name: req.params.id }, function (err, entry) {
    if (entry==null) { // No results.
      res.render('gallery_error', { title: 'Error' });
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
      res.render('gallery_show', { title: entry.original_name, entry: entry, time: formattedDate, link: '../uploads/' + entry.image_name });
    }
  });
}
