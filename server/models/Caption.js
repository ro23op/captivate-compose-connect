// models/Caption.js
const mongoose = require('mongoose');

const captionSchema = new mongoose.Schema({
  prompt: String,
  captions: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Caption', captionSchema);
