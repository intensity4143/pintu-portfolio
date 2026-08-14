const router = require('express').Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const { uploadImage, deleteFromCloudinary } = require('../utils/cloudinary');

// Public
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected - update text fields
router.put('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Protected - upload profile image
router.post('/image', auth, uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const existing = await Profile.findOne();
    if (existing?.profileImagePublicId) await deleteFromCloudinary(existing.profileImagePublicId);
    const profile = await Profile.findOneAndUpdate(
      {},
      { profileImage: req.file.path, profileImagePublicId: req.file.filename },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected - upload resume
router.post('/resume', auth, uploadImage.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const existing = await Profile.findOne();
    if (existing?.resumePublicId) await deleteFromCloudinary(existing.resumePublicId, 'raw');
    const profile = await Profile.findOneAndUpdate(
      {},
      { resumeUrl: req.file.path, resumePublicId: req.file.filename },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
