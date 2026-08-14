const router = require('express').Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const { uploadImage, deleteFromCloudinary } = require('../utils/cloudinary');

// Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected
router.post('/', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.body.techStack) data.techStack = JSON.parse(req.body.techStack);
    if (req.body.highlights) data.highlights = JSON.parse(req.body.highlights);
    if (req.file) { data.image = req.file.path; data.imagePublicId = req.file.filename; }
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.body.techStack) data.techStack = JSON.parse(req.body.techStack);
    if (req.body.highlights) data.highlights = JSON.parse(req.body.highlights);
    if (req.file) {
      const existing = await Project.findById(req.params.id);
      if (existing?.imagePublicId) await deleteFromCloudinary(existing.imagePublicId);
      data.image = req.file.path;
      data.imagePublicId = req.file.filename;
    }
    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    if (project.imagePublicId) await deleteFromCloudinary(project.imagePublicId);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
