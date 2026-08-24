const router = require('express').Router();
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');
const Message = require('../models/Message');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Public - submit contact form
router.post('/', async (req, res) => {
  try {
    console.log('📩 Contact API called');
    console.log('Request body:', req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.log('❌ Missing required fields');

      return res.status(400).json({
        message: 'All fields required',
      });
    }

    console.log('💾 Saving message to MongoDB...');

    const doc = await Message.create({
      name,
      email,
      message,
    });

    console.log('✅ Message saved:', doc._id);

    console.log('📧 Email configuration:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

    console.log('📤 Sending email...');

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);

    return res.status(201).json({
      message: 'Message sent',
      id: doc._id,
    });

  } catch (err) {
    console.error('❌ CONTACT ERROR:', err);
    console.error('Error message:', err.message);

    return res.status(500).json({
      message: 'Failed to send message',
      error: err.message,
    });
  }
});

// Protected - get all messages
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected - mark as read
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Protected - delete
router.delete('/:id', auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;