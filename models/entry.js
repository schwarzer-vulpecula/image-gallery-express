const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const EntrySchema = new Schema(
  {
    image_url: {type: String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    expireAt: {type: Date, default: tomorrow}
  }
);

module.exports = mongoose.model('Entry', EntrySchema)
