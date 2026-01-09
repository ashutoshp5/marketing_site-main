// models/BlogPost.js
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
    imageUrl: { type: String },
    uploadedImagePath: { type: String }, // For locally uploaded images

  },
  { timestamps: true }
);

const BlogPost = model('BlogPost', blogPostSchema);

export default BlogPost;
