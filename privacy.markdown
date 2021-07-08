---

layout: default

title: Privacy

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

# Privacy

In **image-gallery-express**, users have the option to upload their images privately. The public gallery will not index the image, meaning the only way to view the image is by saving the link to it. This is similar to many image galleries out there in the web.

To ensure this level of privacy, links to images must be unique and unguessable (ie. random). This is to prevent people from performing a brute force search to see private images when they are not supposed to. Initially, Mongoose object IDs look ideal to use. Since images are already part of the database record, as detailed in the [entry](./uploading#entry) subsection of the [uploading](./uploading) section, this made the most sense. The images could simply be named with the ID, and it would already be unique. However, although this value looks seemingly random, I began to notice patterns, especially when comparing two images that were uploaded simultaneously. That was when I decided to use hashes.

Fortunately, the SJCL (Stanford JavaScript Crypto Library) allows for easy hashing. Many thanks to the developers and maintainers!

```js
const express = require('express');
const router = express.Router();
const sjcl = require('sjcl');

// Multer
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/');
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    cb(null, sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(file.originalname + Date.now() + Math.random())) + '.' + extension);
  }
})
```

Simply hashing the original name of the file with the current time in milliseconds and a random number will create a statistically unique and unpredictable string. Theoretically, this is not unique if the conditions are met, but the chances of that happening is next to zero.
