import mongoose from 'mongoose';

const subscriptionEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionEmailSchema.index({ email: 1 });
subscriptionEmailSchema.index({ createdAt: -1 });

const SubscriptionEmail = mongoose.model('SubscriptionEmail', subscriptionEmailSchema);

export default SubscriptionEmail;
