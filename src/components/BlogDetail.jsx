// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './BlogDetail.css'; // Optional: For additional custom styles

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BlogDetail = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the blog details using the ID
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
        console.log('Fetching blog:', `${API_BASE_URL}/blogs/${id}`);
        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorMessage = `Failed to fetch blog post: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Fetched blog data:', data);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading blog post...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="text-center text-gray-500">Blog post not found.</div>;
  }

  // Determine the final image source
  const imageSrc =   blog.uploadedImagePath?.startsWith('http')
    ? blog.uploadedImagePath
    : blog.imageUrl?.startsWith('http')
    ? blog.imageUrl
    : null;

  // Custom renderer for code blocks with syntax highlighting
  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm mb-4">
        <Link to="/" className="text-teal-600 hover:underline">Home</Link> /{' '}
        <Link to="/blogs" className="text-teal-600 hover:underline">Blogs</Link> /{' '}
        <span className="text-gray-500">{blog.title}</span>
      </nav>

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-teal-600 mb-4">{blog.title}</h1>

      {/* Blog Meta Information */}
      <div className="text-gray-500 mb-4">
        <span>{new Date(blog.date).toLocaleDateString()}</span> &bull;{' '}
        <span>{blog.author}</span>
      </div>

      {/* Blog Featured Image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={blog.title}
          className="w-full h-auto rounded-lg mb-6 object-contain"
          style={{ aspectRatio: '16/9' }}
          loading="lazy" // Improves performance by lazy loading the image
        />
      )}

      {/* Blog Content */}
      <div className="prose lg:prose-xl text-gray-700">
        <ReactMarkdown
          children={blog.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          components={renderers}
        />
      </div>

      {/* Back to Blogs Button */}
      <div className="mt-8">
        <Link to="/blogs" className="text-teal-600 hover:underline">
          &larr; Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
