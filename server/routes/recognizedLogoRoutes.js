import { Router } from 'express';

import { adminAuth } from '../middleware/adminAuth.js';
import imageUpload from '../middleware/imageUpload.js';
import {
  adminListRecognizedLogos,
  createRecognizedLogo,
  deleteRecognizedLogo,
  getRecognizedLogos,
} from '../controllers/recognizedLogoController.js';

const router = Router();

// Public
router.get('/', getRecognizedLogos);

// Admin
router.get('/admin', adminAuth, adminListRecognizedLogos);
router.post('/', adminAuth, imageUpload.single('image'), createRecognizedLogo);
router.delete('/:id', adminAuth, deleteRecognizedLogo);

export default router;
