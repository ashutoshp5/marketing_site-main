import express from 'express';
import rateLimit from 'express-rate-limit';

import { adminAuth } from '../middleware/adminAuth.js';
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
} from '../controllers/subscriptionController.js';

const router = express.Router();

// Public subscribe endpoint (abuse-prone)
const subscribeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 80,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', subscribeLimiter, createSubscription);

// Admin-only endpoints
router.get('/', adminAuth, getAllSubscriptions);
router.delete('/:id', adminAuth, deleteSubscription);

export default router;
