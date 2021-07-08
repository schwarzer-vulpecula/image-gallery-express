const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntrySchema = new Schema(
  {
    image_name: {type: String, required: true},
    original_name: {type: String, required: true},
    description: {type: String},
    public_image: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
  }
);

module.exports = mongoose.model('Entry', EntrySchema);
