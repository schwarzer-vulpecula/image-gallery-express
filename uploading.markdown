---

layout: default

title: Uploading

---

## Table of Contents
- [Basic Information](./)
- [Routing](./routing)
- [Uploading](./uploading)
  - [Filtering](./uploading#filtering)
  - [Storage](./uploading#storage)
  - [Entries](./uploading#entries)
- [Privacy](./privacy)
- [Gallery](./gallery)
- [Cleaning](./cleaning)
- [Demonstration](./demo)
- [Other Projects](https://schwarzer-vulpecula.github.io)

# Uploading

Uploading is the core functionality of any image gallery. Although simple in concept, there are many pitfalls that need to be avoided. Fortunately, the Multer middleware provides ways of doing this easily. Many thanks to the creator of Multer!

## Filtering

An image gallery should not accept any kind of files. There has to be limits in place, but most importantly, it should only accept images. This can be easily done in Multer.

```js
// routes/upload.js

// Multer
const multer = require('multer')

const imageFileFilter = (req, file, cb) =>{
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { // If the file uploaded is not of these types
      return cb(null, false);
  }
  cb(null, true)
};
 
const upload = multer({ storage: storage, fileFilter: imageFileFilter, limits: { fileSize: 8000000 } })
```

The `fileFilter` and `limits` properties of the object we pass into Multer will place constraints on the files that can be uploaded. `8000000` is in bytes, which equals to 8 megabytes. Files are also only accepted based on their extensions. However, this filter by extension is not enough as changing a file extension is very easy to do. **File extensions can never be relied on for security**. More advanced checks will need to be done, and I decided that the controller should do it.

```js
// controllers/uploads_controller.js
const sizeOf = require('image-size');
const fs = require('fs');

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
  }
}
```

I find that checking for the dimensions of the image using another Node module called `image-size` (Many thanks to their creator!) works well. People who know about file magic bytes might think that checking for them is enough. Unfortunately, forging magic bytes is very easy to do. On the other hand, forging a file that will pass this check is not as straightforward.

One thing that I know by doing this is that it is theoretically possible to upload an image of a type that is not included in the Multer filter (png, jpg, or gif only). It just has to pass the image size check, and named with a file extension that is accepted. Based on my observations, this is not a big problem as the file uploaded will very likely be an image anyway.

Below is a GIF showcasing this functionality.

![Uploading Faulty Files](./uploading-faulty-files.gif)
