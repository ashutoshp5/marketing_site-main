import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const partnerLogoSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    alt: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PartnerLogo = model('PartnerLogo', partnerLogoSchema);

export default PartnerLogo;
