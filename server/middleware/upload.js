import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve(process.cwd(), 'uploads');
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
    } catch (err) {
      return cb(err);
    }
    cb(null, uploadDir); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // File name with timestamp for uniqueness
  },
});

// Filter to ensure only image files are uploaded
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/; // Allowed extensions
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer with the storage and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
});

export default upload;
