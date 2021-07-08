---

layout: default

title: Cleaning

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

# Cleaning

During the development of **image-gallery-express**, the database and images uploaded often needed to be deleted. Express.js does not have a built-in way of doing this. I decided to create a script that can be run using Node. Although this script is not a core function of a gallery, I believe this is something worthy to be mentioned.

```js
// clean.js
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const directories = ['tmp', 'public/uploads'];

// Delete database
const url = "mongodb://localhost:27017/image-gallery-express";
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if (err) throw err;
  client.db('image-gallery-express').dropDatabase(function(err, result){
    if (err) throw err;
    client.close();
  });
});

// Delete uploads
for (const directory of directories) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      if (file != 'readme.txt'){
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    }
  });
}
```

When Node runs this script, the database will be completely deleted, and all files (except for the `readme.txt`) inside the `tmp` and `public/uploads` folders will be deleted. Rather than having to manually delete all uploads from the folders and typing `db.dropDatabase()` in the MongoDB shell ever time I needed a full reset, running this script was all that I needed to do. This was very helpful during development.
