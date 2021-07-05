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

