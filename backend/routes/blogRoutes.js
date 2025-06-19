import { Router } from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/blogController.js';

import { adminAuth } from '../middleware/adminAuth.js';
import upload from '../middleware/upload.js'; // Multer + Cloudinary support

const router = Router();

// Public Routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Admin Routes (Protected by adminAuth)
// Upload field name must be 'image' for req.file to work with multer
router.post('/', adminAuth, upload.single('image'), createPost);
router.put('/:id', adminAuth, upload.single('image'), updatePost);
router.delete('/:id', adminAuth, deletePost);

export default router;
