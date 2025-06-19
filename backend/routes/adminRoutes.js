import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();

// Protected route just to verify admin credentials
router.get('/verify', adminAuth, (req, res) => {
  res.sendStatus(200);
});

export default router;
