const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  highlights: [String],
  techStack: [String],
  image: { type: String },
  imagePublicId: { type: String },
  github: { type: String },
  demo: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true });

projectSchema.index({ order: 1 });

module.exports = mongoose.model('Project', projectSchema);
