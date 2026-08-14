const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['Languages', 'Frontend', 'Backend', 'Databases', 'DevOps', 'Tools', 'Core CS', 'Other'],
    required: true,
  },
  icon: { type: String }, // icon key name e.g. "SiReact"
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
