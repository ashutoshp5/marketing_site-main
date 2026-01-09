import { Router } from 'express';

import { adminAuth } from '../middleware/adminAuth.js';
import imageUpload from '../middleware/imageUpload.js';
import {
  adminListPartnerLogos,
  createPartnerLogo,
  deletePartnerLogo,
  getPartnerLogos,
} from '../controllers/partnerLogoController.js';

const router = Router();

// Public
router.get('/', getPartnerLogos);

// Admin
router.get('/admin', adminAuth, adminListPartnerLogos);
router.post('/', adminAuth, imageUpload.single('image'), createPartnerLogo);
router.delete('/:id', adminAuth, deletePartnerLogo);

export default router;
