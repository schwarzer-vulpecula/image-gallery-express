const Entry = require('../models/entry');
const url = require('url');
const imagesPerPage = 15;

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
        const pages = []; // This array will determine which page numbers will the view render
        /*
          4 page numbers from before and after the current page will be displayed, and the remaining numbers will be displayed as ...
          Page 1 must always be displayed
        */ 

        // Display 1, 1 & 2, or 1 & ...
        if (page - 5 == 1) { pages.push(1); }
        else if (page - 5 > 1){
          pages.push(1);
          if (page - 5 == 2) { pages.push(2); }
          else { pages.push('...'); }
        }

        // Displaying n-4 pages
        for (let n = page - 4; n < page; n++){
          if (n > 0) { pages.push(n); }
        }

        // Displaying current page
        pages.push(page);

        // Displaying n+4 pages
        for (let n = page + 1; n <= page + 4; n++){
          if (n <= maxPage) { pages.push(n); }
        }

        // Displaying the last page
        if (page + 5 < maxPage) { pages.push('...'); }
        else if (page + 5 == maxPage) { pages.push(maxPage); }

        res.render('gallery_index', { title: 'Gallery', entries: entries, uploads_path: '../uploads/', gallery_path: '../gallery/', page: page, maxPage: maxPage, pages: pages });
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
