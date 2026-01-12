import SubscriptionEmail from '../models/SubscriptionEmail.js';

const normalizeEmail = (value) => String(value || '').trim().toLowerCase();

const isValidEmail = (value) => {
  // Intentionally simple + robust check (same spirit as contact form)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(value || ''));
};

export const createSubscription = async (req, res) => {
  const email = normalizeEmail(req?.body?.email);

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (email.length > 254) {
    return res.status(400).json({ error: 'Email is too long.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const existing = await SubscriptionEmail.findOne({ email }).lean();
    if (existing?._id) {
      // Do not reveal extra info; treat as idempotent
      return res.status(200).json({ success: true, message: 'Already subscribed.', subscriptionId: existing._id });
    }

    const created = await SubscriptionEmail.create({ email });
    return res.status(201).json({ success: true, message: 'Subscribed successfully.', subscriptionId: created._id });
  } catch (err) {
    // Handle race condition on unique index
    if (err?.code === 11000) {
      return res.status(200).json({ success: true, message: 'Already subscribed.' });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('Error creating subscription:', err);
    }

    return res.status(500).json({ error: 'Failed to subscribe. Please try again later.' });
  }
};

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionEmail.find()
      .sort({ createdAt: -1 })
      .limit(500);

    return res.status(200).json(subscriptions);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching subscriptions:', err);
    }
    return res.status(500).json({ error: 'Failed to fetch subscriptions.' });
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SubscriptionEmail.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error deleting subscription:', err);
    }
    return res.status(500).json({ error: 'Failed to delete subscription.' });
  }
};
