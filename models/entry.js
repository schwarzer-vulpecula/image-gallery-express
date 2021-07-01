const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var EntrySchema = new Schema(
  {
    
  }
);

module.exports = mongoose.model('Entry', EntrySchema)
