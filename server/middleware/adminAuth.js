import jwt from 'jsonwebtoken';

function getBearerToken(req) {
  const header = String(req.headers.authorization || '').trim();
  if (!header) return '';
  const [scheme, token] = header.split(' ');
  if (scheme?.toLowerCase() !== 'bearer') return '';
  return String(token || '').trim();
}

export function adminAuth(req, res, next) {
  const token = getBearerToken(req);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const secret = String(process.env.JWT_SECRET || '').trim();
  if (!secret) {
    return res.status(500).json({ error: 'Server misconfigured (JWT_SECRET missing)' });
  }

  try {
    const payload = jwt.verify(token, secret);
    // Attach admin info for downstream handlers if needed
    req.admin = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
