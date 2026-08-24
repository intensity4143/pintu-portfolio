const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'portfolio', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] },
});

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio/resume',
    allowed_formats: ['pdf'],
    resource_type: 'raw',
    type: 'upload',
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadResume = multer({ storage: resumeStorage });

const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (e) {
    console.error('Cloudinary delete error:', e.message);
  }
};

module.exports = { cloudinary, uploadImage, uploadResume, deleteFromCloudinary };
