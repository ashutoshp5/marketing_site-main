import { Router } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();

function safeEqual(a, b) {
  const aBuf = Buffer.from(String(a || ''), 'utf8');
  const bBuf = Buffer.from(String(b || ''), 'utf8');
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  const expectedUsername = String(process.env.ADMIN_USERNAME || '').trim();
  const expectedPassword = String(process.env.ADMIN_PASSWORD || '').trim();
  const secret = String(process.env.JWT_SECRET || '').trim();
  const expiresIn = String(process.env.JWT_EXPIRES_IN || '12h').trim();

  if (!expectedUsername || !expectedPassword) {
    return res.status(500).json({ error: 'Server misconfigured (ADMIN credentials missing)' });
  }
  if (!secret) {
    return res.status(500).json({ error: 'Server misconfigured (JWT_SECRET missing)' });
  }

  const providedUsername = String(username || '').trim();
  const providedPassword = String(password || '').trim();

  const ok = safeEqual(providedUsername, expectedUsername) && safeEqual(providedPassword, expectedPassword);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { sub: 'admin', username: expectedUsername, role: 'admin' },
    secret,
    { expiresIn }
  );

  return res.status(200).json({ token, expiresIn });
});

router.get('/verify', adminAuth, (req, res) => {
  return res.status(200).json({ message: 'Authentication successful' });
});

export default router;
