const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  intro: { type: String },
  about: {
    paragraphs: [String],
    stats: [{ label: String, value: String }],
  },
  profileImage: { type: String },
  profileImagePublicId: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  resumeUrl: { type: String },
  resumePublicId: { type: String },
  socialLinks: {
    github: String,
    linkedin: String,
    leetcode: String,
    geeksforgeeks: String,
    codeforces: String,
    codechef: String,
  },
  siteTitle: { type: String },
  siteDescription: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
