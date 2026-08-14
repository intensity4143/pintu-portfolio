const router = require('express').Router();
const auth = require('../middleware/auth');
const Experience = require('../models/Experience');

router.get('/', async (req, res) => {
  try {
    const exp = await Experience.find().sort({ order: 1, startDate: -1 });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.responsibilities && typeof data.responsibilities === 'string')
      data.responsibilities = JSON.parse(data.responsibilities);
    if (data.technologies && typeof data.technologies === 'string')
      data.technologies = JSON.parse(data.technologies);
    const exp = await Experience.create(data);
    res.status(201).json(exp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.responsibilities && typeof data.responsibilities === 'string')
      data.responsibilities = JSON.parse(data.responsibilities);
    if (data.technologies && typeof data.technologies === 'string')
      data.technologies = JSON.parse(data.technologies);
    const exp = await Experience.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!exp) return res.status(404).json({ message: 'Not found' });
    res.json(exp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
