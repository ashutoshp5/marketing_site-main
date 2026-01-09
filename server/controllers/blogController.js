//// controllers/blogController.js
import BlogPost from '../models/BlogPost.js';
import { isCloudinaryConfigured, uploadImageBuffer } from '../config/cloudinary.js';

const isHttpUrl = (value) => {
  if (!value) return false;
  try {
    const url = new URL(String(value));
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export async function getAllPosts(req, res) {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching all posts:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// @desc    Get single blog post
// @route   GET /api/blogs/:id
// @access  Public
export async function getPostById(req, res) {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private
export async function createPost(req, res) {
  try {
    const { title, content, author, category, imageUrl: rawImageUrl, date } = req.body;

    const manualUrl = String(rawImageUrl || '').trim();
    let imageUrl = '';

    if (req.file?.buffer) {
      if (!isCloudinaryConfigured()) {
        return res.status(500).json({ message: 'Cloudinary is not configured' });
      }
      const result = await uploadImageBuffer(req.file.buffer, { folder: 'blogs' });
      imageUrl = result?.secure_url || '';
    } else if (manualUrl) {
      if (!isHttpUrl(manualUrl)) {
        return res.status(400).json({ message: 'Invalid image URL' });
      }
      imageUrl = manualUrl;
    } else {
      return res.status(400).json({ message: 'An image file or image URL is required' });
    }

    const newPost = new BlogPost({
      title,
      content,
      author,
      category,
      ...(date ? { date: new Date(date) } : {}),
      imageUrl,
      uploadedImagePath: null,
    });

    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating new post:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private
export async function updatePost(req, res) {
  try {
    const { title, content, author, category, imageUrl: rawImageUrl, date } = req.body;

    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const manualUrl = String(rawImageUrl || '').trim();
    let nextImageUrl = '';

    if (req.file?.buffer) {
      if (!isCloudinaryConfigured()) {
        return res.status(500).json({ message: 'Cloudinary is not configured' });
      }
      const result = await uploadImageBuffer(req.file.buffer, { folder: 'blogs' });
      nextImageUrl = result?.secure_url || '';
    } else if (manualUrl) {
      if (!isHttpUrl(manualUrl)) {
        return res.status(400).json({ message: 'Invalid image URL' });
      }
      nextImageUrl = manualUrl;
    } else {
      // No new image provided; keep existing.
      nextImageUrl = post.imageUrl || '';
    }

    if (!nextImageUrl) {
      return res.status(400).json({ message: 'An image file or image URL is required' });
    }

    // Update fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.author = author || post.author;
    post.category = category || post.category;
    if (date) {
      post.date = new Date(date);
    }
    post.uploadedImagePath = null;
    post.imageUrl = nextImageUrl;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private
export async function deletePost(req, res) {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    res.status(200).json({ message: 'Post removed' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}
