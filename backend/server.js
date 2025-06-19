import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/db.js';

dotenv.config();

// Routes
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from './routes/blogRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(bodyParser.json());
const allowedOrigins = [
  'https://marketing-site-ten-mu.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://admin-blogs.vercel.app',
  'https://www.kifaytihealth.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('❌ Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you're using cookies/auth
}));


// (Optional) Serve static images if any local uploads still exist — remove if only using Cloudinary
// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes

app.use("/api/contact", contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint (optional)
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
