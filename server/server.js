import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js'; // Added .js extension

// Import Routes
import contactRoutes from "./routes/contactRoutes.js"; // Added .js extension
import blogRoutes from './routes/blogRoutes.js';       // Added .js extension
import adminRoutes from './routes/adminRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import recognizedLogoRoutes from './routes/recognizedLogoRoutes.js';
import partnerLogoRoutes from './routes/partnerLogoRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.set('trust proxy', 1);
app.disable('x-powered-by');

// Connect to Database
connectDB();


// Middleware
app.use(helmet());
app.use(express.json({ limit: '200kb' }));

// Basic rate limiting (fine-tune per route below)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// CORS (locked down)
const parseCorsOrigins = (value) => {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
};

// Configure allowed origins via env:
// - CORS_ORIGINS="https://your-site.com,https://www.your-site.com"
// Policy: ONLY localhost + ONLY the origins listed in CORS_ORIGINS.
const envAllowedOrigins = parseCorsOrigins(process.env.CORS_ORIGINS);

const localhostOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const allowedOrigins = Array.from(new Set([...localhostOrigins, ...envAllowedOrigins]));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (no Origin header), e.g. curl/postman/server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);
    const err = new Error(`CORS blocked for origin: ${origin}`);
    err.status = 403;
    return callback(err);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Serve Static Files for Uploaded Images
const __dirname = path.resolve(); // Get the current directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// Route-specific rate limiting for abuse-prone endpoints
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// Contact limiter is applied in the contact router.

app.use("/api/contact", contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminLoginLimiter, adminRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/recognized-logos', recognizedLogoRoutes);
app.use('/api/partner-logos', partnerLogoRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/roles', roleRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Upload / API error handling (ensure JSON, not HTML)
app.use((err, req, res, next) => {
  if (err?.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'Image too large. Max size is 2MB.' });
  }

  if (err instanceof Error) {
    const msg = String(err.message || '');
    if (msg.toLowerCase().includes('image')) {
      return res.status(400).json({ message: msg });
    }
  }

  return next(err);
});

// 404 handler (JSON)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler (JSON)
app.use((err, req, res, next) => {
  const status = Number(err?.status || err?.statusCode) || 500;
  const message = status >= 500 ? 'Server error' : String(err?.message || 'Request failed');

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(status).json({ error: message });
});

// Start Server
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
