const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  highlight: { type: String },
  date: { type: Date },
  organization: { type: String },
  url: { type: String },
  image: { type: String },
  imagePublicId: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
