import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Newspaper, AlertTriangle } from 'lucide-react';
import { getServerBaseUrl } from '../lib/apiBase';

const BlogCard = ({ post }) => {
  // Default placeholder image (using a professional workspace image)
  const defaultImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

  const apiUrl = getServerBaseUrl();
  
  const legacyUploaded = post.uploadedImagePath ? `${apiUrl}${post.uploadedImagePath}` : '';
  const finalImageSrc = post.imageUrl || legacyUploaded || defaultImage;

  // Function to get category icon
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'news':
        return <Newspaper className="w-4 h-4" />;
      case 'report':
        return <AlertTriangle className="w-4 h-4" />;
      case 'blog post':
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <Link to={`/blogs/${post._id}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group-hover:border-teal-300">
        {/* Category Tag */}
        <div className="p-4 pb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 font-medium">
            {getCategoryIcon(post.category)}
            {post.category}
          </div>
        </div>

        {/* Image Section */}
        <div className="px-4 pb-4">
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={finalImageSrc}
              alt={post.title}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 pt-0 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors duration-200">
              {post.title}
            </h3>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-500">
              {formatDate(post.date)}, {post.author}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
    
    
};

export default BlogCard;
