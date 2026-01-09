import multer from 'multer';

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_BYTES },
  fileFilter: (req, file, cb) => {
    const mimetype = String(file?.mimetype || '');
    if (!mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
});

export default imageUpload;
