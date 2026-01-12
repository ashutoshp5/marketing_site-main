import { Router } from 'express';

import { adminAuth } from '../middleware/adminAuth.js';
import {
  createRole,
  deleteRole,
  getAdminRoles,
  getPublicRoles,
  updateRole,
} from '../controllers/roleController.js';

const router = Router();

// Public: active roles only
router.get('/', getPublicRoles);

// Admin
router.get('/admin', adminAuth, getAdminRoles);
router.post('/', adminAuth, createRole);
router.patch('/:id', adminAuth, updateRole);
router.delete('/:id', adminAuth, deleteRole);

export default router;
