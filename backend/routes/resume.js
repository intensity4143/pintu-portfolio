const router = require('express').Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const { uploadResume, deleteFromCloudinary } = require('../utils/cloudinary');

// Public - get current resume URL
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne().select('resumeUrl');
    res.json({ resumeUrl: profile?.resumeUrl || null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected - upload/replace resume
router.post('/', auth, uploadResume.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const existing = await Profile.findOne();
    if (existing?.resumePublicId) await deleteFromCloudinary(existing.resumePublicId, 'raw');
    const profile = await Profile.findOneAndUpdate(
      {},
      { resumeUrl: req.file.path, resumePublicId: req.file.filename },
      { new: true, upsert: true }
    );
    res.json({ resumeUrl: profile.resumeUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected - delete resume
router.delete('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (profile?.resumePublicId) await deleteFromCloudinary(profile.resumePublicId, 'raw');
    await Profile.findOneAndUpdate({}, { resumeUrl: null, resumePublicId: null });
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
