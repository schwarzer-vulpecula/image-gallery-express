const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var EntrySchema = new Schema(
  {
    image_url: {type: String, required: true},
    description: {type: String},
    created_at: {type: Date, required: true},
  }
);

module.exports = mongoose.model('Entry', EntrySchema)
