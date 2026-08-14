const router = require('express').Router();
const auth = require('../middleware/auth');
const Achievement = require('../models/Achievement');
const { uploadImage, deleteFromCloudinary } = require('../utils/cloudinary');

router.get('/', async (req, res) => {
  try {
    const items = await Achievement.find().sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) { data.image = req.file.path; data.imagePublicId = req.file.filename; }
    const item = await Achievement.create(data);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const existing = await Achievement.findById(req.params.id);
      if (existing?.imagePublicId) await deleteFromCloudinary(existing.imagePublicId);
      data.image = req.file.path;
      data.imagePublicId = req.file.filename;
    }
    const item = await Achievement.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Achievement.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    if (item.imagePublicId) await deleteFromCloudinary(item.imagePublicId);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
