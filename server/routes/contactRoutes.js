import express from "express";
import rateLimit from 'express-rate-limit';
import { 
  handleContactForm, 
  getAllContacts, 
  getContactById, 
  updateContactStatus 
} from "../controllers/contactController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

const contactSubmitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

// Public route - Contact form submission
router.post("/submit", contactSubmitLimiter, handleContactForm);

// Protected admin routes
router.get("/", adminAuth, getAllContacts);
router.get("/:id", adminAuth, getContactById);
router.patch("/:id/status", adminAuth, updateContactStatus);

export default router;
