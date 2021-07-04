const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const EntrySchema = new Schema(
  {
    image_name: {type: String, required: true},
    original_name: {type: String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now}
  }
);

module.exports = mongoose.model('Entry', EntrySchema);
