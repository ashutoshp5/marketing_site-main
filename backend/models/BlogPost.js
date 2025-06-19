import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    category: {
      type: String,
      enum: ['News', 'Blog Post', 'Report'],
      required: true,
    },
    date: { type: Date, default: Date.now },

    // Cloudinary image (primary field after integration)
    uploadedImagePath: { type: String }, // Stores Cloudinary image URL

    // Optional manual image URL (if no upload)
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const BlogPost = model('BlogPost', blogPostSchema);

export default BlogPost;
