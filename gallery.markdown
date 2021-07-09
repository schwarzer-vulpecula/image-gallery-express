---

layout: default

title: Gallery

---

## Table of Contents
- [Basic Information](./)
- [Routing](./routing)
- [Uploading](./uploading)
- [Privacy](./privacy)
- [Gallery](./gallery)
- [Cleaning](./cleaning)
- [Demonstration](./demo)
- [Other Projects](https://schwarzer-vulpecula.github.io)

# Gallery

![Images Per Page](./images-per-page.png)

Not all images are displayed in the gallery immediately, because the gallery is separated into pages. Only 15 are ever displayed per page. The page functionality was done using query parameters.

```js
// controllers/gallery_controller.js
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
        // Render view with the results
      });
  });
}
```

Notice how the database query to populate the gallery will only search for 15 entries, rather than all entries. The results will only have the image name, as that is the only property needed to display the image, as well as providing a link to the details page, where every property will be displayed there instead. It is important to never query more than what is needed, as that will slow the application down. Also, default values are placed in case the query parameter is invalid or empty.

Since images are separated into pages, the view will also need to provide a way for the user to change pages. The view should be able dynamically render the page buttons based on how many pages there are, and although the view can be programmed to do this, it is better to do most of it in the controller. Programming in the template engine should be avoided.

```js
// controllers/gallery_controller.js

// Callback function that should be called after the database query
function (err, entries){
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
```

The end result of this complicated code is a neat looking page buttons row.

![Gallery Pages](./gallery-pages.png)
