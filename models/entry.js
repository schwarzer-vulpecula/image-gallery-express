const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var EntrySchema = new Schema(
  {
    image: {type: String, required: true},
    description: {type: String},
    created_at: {type: Date, required: true},
  }
);

module.exports = mongoose.model('Entry', EntrySchema)
