import { Router } from 'express';
import { getAllTestimonials, createTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();

// Public
router.get('/', getAllTestimonials);

// Admin-protected
router.post('/', adminAuth, createTestimonial);
router.delete('/:id', adminAuth, deleteTestimonial);

export default router;
