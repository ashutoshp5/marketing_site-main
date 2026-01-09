import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const recognizedLogoSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    alt: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const RecognizedLogo = model('RecognizedLogo', recognizedLogoSchema);

export default RecognizedLogo;
