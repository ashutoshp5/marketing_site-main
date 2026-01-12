import React, { useState, useEffect } from 'react';
import { Users, Mail, FileText, Calendar, AlertCircle, CheckCircle2, Clock, Eye, Trash2, Edit, Plus, Lock, User, MessageSquare, Image } from 'lucide-react';

const getApiBaseUrl = () => {
  const fallback = import.meta.env.DEV ? 'http://localhost:5000' : '';
  const raw = (import.meta.env.VITE_API_URL || fallback).toString().replace(/\/$/, '');
  return raw.endsWith('/api') ? raw : `${raw}/api`;
};

const getServerBaseUrl = () => {
  const api = getApiBaseUrl();
  return api.replace(/\/api\/?$/, '');
};

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_BASE_URL = getApiBaseUrl();

      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid credentials. Please check your username and password.');
        } else if (response.status === 404) {
          setError('Admin login endpoint not found (check API base URL).');
        } else {
          setError(`Login failed (HTTP ${response.status}). Please try again.`);
        }
        return;
      }

      const data = await response.json();
      if (!data?.token) {
        setError('Login succeeded but no token was returned.');
        return;
      }

      onLogin(data.token);
    } catch (_err) {
      setError('Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-[#14b8a6] rounded-full p-3">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access the admin panel
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#14b8a6] focus:border-[#14b8a6] sm:text-sm"
                  placeholder="Enter admin username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#14b8a6] focus:border-[#14b8a6] sm:text-sm"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#14b8a6] hover:bg-[#10b3a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14b8a6] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
  const IMAGE_HELP_TEXT = 'Max 2MB. Upload will be stored on Cloudinary, or paste an image URL to save directly.';

  const [contacts, setContacts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [recognizedLogos, setRecognizedLogos] = useState([]);
  const [partnerLogos, setPartnerLogos] = useState([]);
  const [activeTab, setActiveTab] = useState('contacts');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState('');

  const [blogFormMode, setBlogFormMode] = useState(''); // '' | 'create' | 'edit'
  const [blogDraft, setBlogDraft] = useState({
    _id: '',
    title: '',
    content: '',
    author: 'Admin',
    category: 'News',
    date: '',
    imageUrl: '',
    imageFile: null,
  });
  const [blogActionLoading, setBlogActionLoading] = useState(false);

  const [testimonialFormMode, setTestimonialFormMode] = useState(''); // '' | 'create'
  const [testimonialDraft, setTestimonialDraft] = useState({
    name: '',
    location: '',
    text: '',
  });
  const [testimonialActionLoading, setTestimonialActionLoading] = useState(false);

  const [logoDraft, setLogoDraft] = useState({
    imageFile: null,
    imageUrl: '',
    alt: '',
  });
  const [logoActionLoading, setLogoActionLoading] = useState(false);

  const [partnerLogoDraft, setPartnerLogoDraft] = useState({
    imageFile: null,
    imageUrl: '',
    alt: '',
  });
  const [partnerLogoActionLoading, setPartnerLogoActionLoading] = useState(false);

  // API Base URL
  const API_BASE_URL = getApiBaseUrl();
  const SERVER_BASE_URL = getServerBaseUrl();

  const handleLogin = (credentials) => {
    setAdminCredentials(credentials);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminCredentials('');
    setContacts([]);
    setSubscriptions([]);
    setBlogs([]);
    setTestimonials([]);
    setRecognizedLogos([]);
    setPartnerLogos([]);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  const resetBlogDraft = () => {
    setBlogDraft({
      _id: '',
      title: '',
      content: '',
      author: 'Admin',
      category: 'News',
      date: '',
      imageUrl: '',
      imageFile: null,
    });
  };

  const toDateInputValue = (value) => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  };

  const getBlogImageSrc = (blog) => {
    if (!blog) return '';
    if (blog.uploadedImagePath) return `${SERVER_BASE_URL}${blog.uploadedImagePath}`;
    return blog.imageUrl || '';
  };

  const startCreateBlog = () => {
    setError('');
    resetBlogDraft();
    setBlogFormMode('create');
  };

  const startEditBlog = (blog) => {
    setError('');
    setBlogDraft({
      _id: blog?._id || '',
      title: blog?.title || '',
      content: blog?.content || '',
      author: blog?.author || 'Admin',
      category: blog?.category || 'News',
      date: toDateInputValue(blog?.date || blog?.createdAt),
      imageUrl: blog?.imageUrl || '',
      imageFile: null,
    });
    setBlogFormMode('edit');
  };

  const cancelBlogForm = () => {
    setError('');
    setBlogFormMode('');
    resetBlogDraft();
  };

  const buildBlogFormData = (draft) => {
    const fd = new FormData();
    fd.append('title', (draft.title || '').trim());
    fd.append('content', (draft.content || '').trim());
    fd.append('author', (draft.author || '').trim());
    fd.append('category', draft.category || 'News');
    if ((draft.date || '').trim()) {
      fd.append('date', draft.date.trim());
    }
    if (draft.imageFile) {
      fd.append('image', draft.imageFile);
    }
    if (!draft.imageFile && (draft.imageUrl || '').trim()) {
      fd.append('imageUrl', draft.imageUrl.trim());
    }
    return fd;
  };

  const createBlog = async () => {
    setBlogActionLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminCredentials}`,
        },
        body: buildBlogFormData(blogDraft),
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to create blog post (HTTP ${response.status}) ${body}`.trim());
      }

      await fetchBlogs();
      cancelBlogForm();
    } catch (err) {
      setError(err?.message || 'Failed to create blog post');
    } finally {
      setBlogActionLoading(false);
    }
  };

  const updateBlog = async () => {
    if (!blogDraft._id) return;

    setBlogActionLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogDraft._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminCredentials}`,
        },
        body: buildBlogFormData(blogDraft),
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to update blog post (HTTP ${response.status}) ${body}`.trim());
      }

      await fetchBlogs();
      cancelBlogForm();
    } catch (err) {
      setError(err?.message || 'Failed to update blog post');
    } finally {
      setBlogActionLoading(false);
    }
  };

  const deleteBlog = async (blogId) => {
    if (!blogId) return;
    const ok = window.confirm('Delete this blog post? This cannot be undone.');
    if (!ok) return;

    setBlogActionLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminCredentials}`,
        },
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to delete blog post (HTTP ${response.status}) ${body}`.trim());
      }

      await fetchBlogs();
      if (blogDraft._id === blogId) {
        cancelBlogForm();
      }
    } catch (err) {
      setError(err?.message || 'Failed to delete blog post');
    } finally {
      setBlogActionLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'contacts') await fetchContacts();
      if (activeTab === 'subscriptions') await fetchSubscriptions();
      if (activeTab === 'blogs') await fetchBlogs();
      if (activeTab === 'testimonials') await fetchTestimonials();
      if (activeTab === 'recognized') await fetchRecognizedLogos();
      if (activeTab === 'partners') await fetchPartnerLogos();
    } catch (err) {
      setError(err?.message || 'Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    const response = await fetch(`${API_BASE_URL}/subscriptions`, {
      headers: {
        'Authorization': `Bearer ${adminCredentials}`,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Failed to fetch subscriptions (HTTP ${response.status}) ${body}`.trim());
    }

    const data = await response.json();
    setSubscriptions(Array.isArray(data) ? data : []);
  };

  const deleteSubscription = async (subscriptionId) => {
    if (!subscriptionId) return;
    const ok = window.confirm('Delete this subscribed email? This cannot be undone.');
    if (!ok) return;

    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminCredentials}`,
        },
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to delete subscription (HTTP ${response.status}) ${body}`.trim());
      }

      await fetchSubscriptions();
    } catch (err) {
      setError(err?.message || 'Failed to delete subscription');
    }
  };

  const fetchRecognizedLogos = async () => {
    const response = await fetch(`${API_BASE_URL}/recognized-logos/admin`, {
      headers: {
        'Authorization': `Bearer ${adminCredentials}`,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Failed to fetch recognized logos (HTTP ${response.status}) ${body}`.trim());
    }

    const data = await response.json();
    setRecognizedLogos(Array.isArray(data) ? data : []);
  };

  const uploadRecognizedLogo = async () => {
    if (!logoDraft.imageFile && !(logoDraft.imageUrl || '').trim()) {
      setError('Please upload a logo image or provide an image URL.');
      return;
    }

    setLogoActionLoading(true);
    setError('');

    try {
      const fd = new FormData();
      if (logoDraft.imageFile) {
        fd.append('image', logoDraft.imageFile);
      }
      if ((logoDraft.imageUrl || '').trim()) {
        fd.append('imageUrl', logoDraft.imageUrl.trim());
      }
      if ((logoDraft.alt || '').trim()) {
        fd.append('alt', logoDraft.alt.trim());
      }

      const response = await fetch(`${API_BASE_URL}/recognized-logos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminCredentials}`,
        },
        body: fd,
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to upload logo (HTTP ${response.status}) ${body}`.trim());
      }

      setLogoDraft({ imageFile: null, imageUrl: '', alt: '' });
      await fetchRecognizedLogos();
    } catch (err) {
      setError(err?.message || 'Failed to upload logo');
    } finally {
      setLogoActionLoading(false);
    }
  };

  const deleteRecognizedLogo = async (logoId) => {
    if (!logoId) return;
    const ok = window.confirm('Delete this logo? This cannot be undone.');
    if (!ok) return;

    setLogoActionLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/recognized-logos/${logoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminCredentials}`,
        },
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to delete logo (HTTP ${response.status}) ${body}`.trim());
      }

      await fetchRecognizedLogos();
    } catch (err) {
      setError(err?.message || 'Failed to delete logo');
    } finally {
      setLogoActionLoading(false);
    }
  };

  const fetchPartnerLogos = async () => {
    const response = await fetch(`${API_BASE_URL}/partner-logos/admin`, {
      headers: {
        'Authorization': `Bearer ${adminCredentials}`,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Failed to fetch partner logos (HTTP ${response.status}) ${body}`.trim());
    }

    const data = await response.json();
    setPartnerLogos(Array.isArray(data) ? data : []);
  };

  const uploadPartnerLogo = async () => {
    if (!partnerLogoDraft.imageFile && !(partnerLogoDraft.imageUrl || '').trim()) {
      setError('Please upload a logo image or provide an image URL.');
      return;
    }

    setPartnerLogoActionLoading(true);
    setError('');

    try {
      const fd = new FormData();
      if (partnerLogoDraft.imageFile) {
        fd.append('image', partnerLogoDraft.imageFile);
      }
      if ((partnerLogoDraft.imageUrl || '').trim()) {
        fd.append('imageUrl', partnerLogoDraft.imageUrl.trim());
      }
      if ((partnerLogoDraft.alt || '').trim()) {
        fd.append('alt', partnerLogoDraft.alt.trim());
      }

      const response = await fetch(`${API_BASE_URL}/partner-logos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminCredentials}`,
        },
        body: fd,
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to upload logo (HTTP ${response.status}) ${body}`.trim());
      }

      setPartnerLogoDraft({ imageFile: null, imageUrl: '', alt: '' });
      await fetchPartnerLogos();
    } catch (err) {
      setError(err?.message || 'Failed to upload logo');
    } finally {
      setPartnerLogoActionLoading(false);
    }
  };

  const deletePartnerLogo = async (logoId) => {
    if (!logoId) return;
    const ok = window.confirm('Delete this logo? This cannot be undone.');
    if (!ok) return;

    setPartnerLogoActionLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/partner-logos/${logoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminCredentials}`,
        },
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to delete logo (HTTP ${response.status}) ${body}`.trim());
      }

      await fetchPartnerLogos();
    } catch (err) {
      setError(err?.message || 'Failed to delete logo');
    } finally {
      setPartnerLogoActionLoading(false);
    }
  };

  const fetchContacts = async () => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      headers: {
        'Authorization': `Bearer ${adminCredentials}`,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Failed to fetch contacts (HTTP ${response.status}) ${body}`.trim());
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      setContacts(data);
      return;
    }
    setContacts(Array.isArray(data?.contacts) ? data.contacts : []);
  };

  const fetchBlogs = async () => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      headers: {
        'Authorization': `Bearer ${adminCredentials}`,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Failed to fetch blogs (HTTP ${response.status}) ${body}`.trim());
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      setBlogs(data);
      return;
    }
    setBlogs(Array.isArray(data?.blogs) ? data.blogs : []);
  };

  const fetchTestimonials = async () => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      headers: {
        'Authorization': `Bearer ${adminCredentials}`,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Failed to fetch testimonials (HTTP ${response.status}) ${body}`.trim());
    }

    const data = await response.json();
    setTestimonials(Array.isArray(data) ? data : []);
  };

  const startCreateTestimonial = () => {
    setError('');
    setTestimonialDraft({ name: '', location: '', text: '' });
    setTestimonialFormMode('create');
  };

  const cancelTestimonialForm = () => {
    setTestimonialFormMode('');
    setTestimonialDraft({ name: '', location: '', text: '' });
  };

  const createTestimonial = async () => {
    setTestimonialActionLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminCredentials}`,
        },
        body: JSON.stringify({
          name: (testimonialDraft.name || '').trim(),
          location: (testimonialDraft.location || '').trim(),
          text: (testimonialDraft.text || '').trim(),
        }),
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to create testimonial (HTTP ${response.status}) ${body}`.trim());
      }

      await fetchTestimonials();
      cancelTestimonialForm();
    } catch (err) {
      setError(err?.message || 'Failed to create testimonial');
    } finally {
      setTestimonialActionLoading(false);
    }
  };

  const deleteTestimonial = async (testimonialId) => {
    if (!testimonialId) return;
    const ok = window.confirm('Delete this testimonial? This cannot be undone.');
    if (!ok) return;

    setTestimonialActionLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/testimonials/${testimonialId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminCredentials}`,
        },
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(`Failed to delete testimonial (HTTP ${response.status}) ${body}`.trim());
      }

      await fetchTestimonials();
    } catch (err) {
      setError(err?.message || 'Failed to delete testimonial');
    } finally {
      setTestimonialActionLoading(false);
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${contactId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminCredentials}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await fetchContacts();
      }
    } catch (_err) {
      setError('Failed to update contact status');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: 'bg-blue-100 text-blue-800 border-blue-200',
      'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      resolved: 'bg-green-100 text-green-800 border-green-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusConfig[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'New'}
      </span>
    );
  };

  return (
    <>
      {!isAuthenticated ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600 mt-1">Manage your website content and inquiries</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="bg-[#14b8a6] text-white px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">KifaytiHealth Admin</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
              <nav className="flex gap-4 sm:gap-8 min-w-max">
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'contacts'
                      ? 'border-[#14b8a6] text-[#14b8a6]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Messages</span>
                  {contacts.length > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                      {contacts.filter(c => c.status === 'new').length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('subscriptions')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'subscriptions'
                      ? 'border-[#14b8a6] text-[#14b8a6]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Subscribed Emails</span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    {subscriptions.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('blogs')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'blogs'
                      ? 'border-[#14b8a6] text-[#14b8a6]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Blog Posts</span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    {blogs.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'testimonials'
                      ? 'border-[#14b8a6] text-[#14b8a6]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Testimonials</span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    {testimonials.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('recognized')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'recognized'
                      ? 'border-[#14b8a6] text-[#14b8a6]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Image className="w-4 h-4" />
                  <span>Recognized By</span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    {recognizedLogos.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('partners')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'partners'
                      ? 'border-[#14b8a6] text-[#14b8a6]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Image className="w-4 h-4" />
                  <span>Partners</span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    {partnerLogos.length}
                  </span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            ) : (
              <>
                {activeTab === 'contacts' && (
                  <div>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                          <Users className="w-5 h-5" />
                          <span>Contact Form Submissions</span>
                        </h2>
                        <p className="text-gray-600 mt-1">Manage customer inquiries and contact requests</p>
                      </div>

                      {contacts.length === 0 ? (
                        <div className="text-center py-12">
                          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No contact submissions yet</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Contact Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Message
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {contacts.map((contact) => (
                                <tr key={contact._id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">
                                        {contact.firstName} {contact.lastName}
                                      </div>
                                      <div className="text-sm text-gray-600">{contact.email}</div>
                                      <div className="text-sm text-gray-600">{contact.phone}</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="max-w-xs">
                                      <p className="text-sm text-gray-900 truncate" title={contact.message}>
                                        {contact.message}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                      {getStatusIcon(contact.status)}
                                      {getStatusBadge(contact.status)}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                      <select
                                        value={contact.status || 'new'}
                                        onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                                      >
                                        <option value="new">New</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'subscriptions' && (
                  <div>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                          <Users className="w-5 h-5" />
                          <span>Newsletter Subscriptions</span>
                        </h2>
                        <p className="text-gray-600 mt-1">Emails collected from the website Subscribe section</p>
                      </div>

                      {subscriptions.length === 0 ? (
                        <div className="text-center py-12">
                          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No subscriptions yet</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {subscriptions.map((sub) => (
                                <tr key={sub._id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{sub.email}</div>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{sub?.createdAt ? new Date(sub.createdAt).toLocaleDateString() : '-'}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <button
                                      onClick={() => deleteSubscription(sub._id)}
                                      className="text-red-600 hover:text-red-800 flex items-center space-x-1 text-sm"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      <span>Delete</span>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'blogs' && (
                  <div>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                            <FileText className="w-5 h-5" />
                            <span>Blog Posts</span>
                          </h2>
                          <p className="text-gray-600 mt-1">Manage your blog content and articles</p>
                        </div>
                        <button
                          onClick={startCreateBlog}
                          className="bg-[#14b8a6] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#10b3a1] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add New Post</span>
                        </button>
                      </div>

                      {blogFormMode && (
                        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {blogFormMode === 'create' ? 'Create Blog Post' : 'Edit Blog Post'}
                              </h3>
                              <p className="text-sm text-gray-600">Provide title, content, category, and an image (URL or upload).</p>
                            </div>
                            <button
                              onClick={cancelBlogForm}
                              className="text-sm text-gray-600 hover:text-gray-900"
                              disabled={blogActionLoading}
                            >
                              Cancel
                            </button>
                          </div>

                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Title</label>
                              <input
                                type="text"
                                value={blogDraft.title}
                                onChange={(e) => setBlogDraft((d) => ({ ...d, title: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                                placeholder="Post title"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Author</label>
                              <input
                                type="text"
                                value={blogDraft.author}
                                onChange={(e) => setBlogDraft((d) => ({ ...d, author: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                                placeholder="Admin"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Category</label>
                              <select
                                value={blogDraft.category}
                                onChange={(e) => setBlogDraft((d) => ({ ...d, category: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                              >
                                <option value="News">News</option>
                                <option value="Blog Post">Blog Post</option>
                                <option value="Report">Report</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Date</label>
                              <input
                                type="date"
                                value={blogDraft.date}
                                onChange={(e) => setBlogDraft((d) => ({ ...d, date: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Image URL (optional if uploading)</label>
                              <input
                                type="url"
                                value={blogDraft.imageUrl}
                                onChange={(e) => setBlogDraft((d) => ({ ...d, imageUrl: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                                placeholder="https://..."
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Content</label>
                              <textarea
                                rows={6}
                                value={blogDraft.content}
                                onChange={(e) => setBlogDraft((d) => ({ ...d, content: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                                placeholder="Write the blog content..."
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Upload Image (optional)</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  if (file && file.size > MAX_IMAGE_BYTES) {
                                    setError('Image too large. Max size is 2MB.');
                                    e.target.value = '';
                                    setBlogDraft((d) => ({ ...d, imageFile: null }));
                                    return;
                                  }
                                  setBlogDraft((d) => ({ ...d, imageFile: file }));
                                }}
                                className="mt-1 w-full"
                              />
                              <p className="text-xs text-gray-500 mt-1">{IMAGE_HELP_TEXT}</p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-end gap-3">
                            <button
                              onClick={cancelBlogForm}
                              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-white"
                              disabled={blogActionLoading}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={blogFormMode === 'create' ? createBlog : updateBlog}
                              disabled={blogActionLoading}
                              className="px-4 py-2 rounded-lg bg-[#14b8a6] text-white hover:bg-[#10b3a1] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {blogActionLoading ? 'Saving...' : (blogFormMode === 'create' ? 'Create Post' : 'Save Changes')}
                            </button>
                          </div>
                        </div>
                      )}

                      {blogs.length === 0 ? (
                        <div className="text-center py-12">
                          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No blog posts yet</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Post Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4">
                                    <div className="flex items-start space-x-3">
                                      {getBlogImageSrc(blog) && (
                                        <img 
                                          src={getBlogImageSrc(blog)} 
                                          alt={blog.title}
                                          className="w-12 h-12 rounded object-cover"
                                        />
                                      )}
                                      <div>
                                        <div className="font-medium text-gray-900">{blog.title}</div>
                                        <div className="text-sm text-gray-600">{blog.author}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                      {blog.category}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{new Date(blog.date || blog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                      <button
                                        className="text-blue-600 hover:text-blue-900 p-1"
                                        onClick={() => window.open(`/blogs/${blog._id}`, '_blank')}
                                        title="View on site"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                      <button
                                        className="text-green-600 hover:text-green-900 p-1"
                                        onClick={() => startEditBlog(blog)}
                                        title="Edit"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button
                                        className="text-red-600 hover:text-red-900 p-1"
                                        onClick={() => deleteBlog(blog._id)}
                                        title="Delete"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'testimonials' && (
                  <div>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                            <MessageSquare className="w-5 h-5" />
                            <span>Testimonials</span>
                          </h2>
                          <p className="text-gray-600 mt-1">Manage testimonials shown on the website</p>
                        </div>
                        <button
                          onClick={startCreateTestimonial}
                          className="bg-[#14b8a6] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#10b3a1] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Testimonial</span>
                        </button>
                      </div>

                      {testimonialFormMode && (
                        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Create Testimonial</h3>
                              <p className="text-sm text-gray-600">Provide name, location, and testimonial text.</p>
                            </div>
                            <button
                              onClick={cancelTestimonialForm}
                              className="text-sm text-gray-600 hover:text-gray-900"
                              disabled={testimonialActionLoading}
                            >
                              Cancel
                            </button>
                          </div>

                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Name</label>
                              <input
                                type="text"
                                value={testimonialDraft.name}
                                onChange={(e) => setTestimonialDraft((d) => ({ ...d, name: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                                placeholder="NAME OR DISEASE"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Location</label>
                              <input
                                type="text"
                                value={testimonialDraft.location}
                                onChange={(e) => setTestimonialDraft((d) => ({ ...d, location: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                                placeholder="Bengaluru"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Text</label>
                              <textarea
                                rows={4}
                                value={testimonialDraft.text}
                                onChange={(e) => setTestimonialDraft((d) => ({ ...d, text: e.target.value }))}
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                                placeholder="One or two lines..."
                              />
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-end gap-3">
                            <button
                              onClick={cancelTestimonialForm}
                              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-white"
                              disabled={testimonialActionLoading}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={createTestimonial}
                              disabled={testimonialActionLoading}
                              className="px-4 py-2 rounded-lg bg-[#14b8a6] text-white hover:bg-[#10b3a1] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {testimonialActionLoading ? 'Saving...' : 'Create'}
                            </button>
                          </div>
                        </div>
                      )}

                      {testimonials.length === 0 ? (
                        <div className="text-center py-12">
                          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No testimonials yet</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Testimonial
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {testimonials.map((t) => (
                                <tr key={t._id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{t.name}</div>
                                    <div className="text-sm text-gray-600">{t.location}</div>
                                    <div className="mt-2 text-sm text-gray-800 max-w-2xl">{t.text}</div>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{t.createdAt ? new Date(t.createdAt).toLocaleDateString() : '-'}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                      <button
                                        className="text-red-600 hover:text-red-900 p-1"
                                        onClick={() => deleteTestimonial(t._id)}
                                        title="Delete"
                                        disabled={testimonialActionLoading}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'recognized' && (
                  <div>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                          <Image className="w-5 h-5" />
                          <span>Recognized By Logos</span>
                        </h2>
                        <p className="text-gray-600 mt-1">Upload and manage logos shown in the Recognized By section.</p>
                      </div>

                      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Logo Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                if (file && file.size > MAX_IMAGE_BYTES) {
                                  setError('Image too large. Max size is 2MB.');
                                  e.target.value = '';
                                  setLogoDraft((d) => ({ ...d, imageFile: null }));
                                  return;
                                }
                                setLogoDraft((d) => ({ ...d, imageFile: file }));
                              }}
                              className="mt-1 w-full"
                              disabled={logoActionLoading}
                            />
                            <p className="text-xs text-gray-500 mt-1">{IMAGE_HELP_TEXT}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
                            <input
                              type="url"
                              value={logoDraft.imageUrl}
                              onChange={(e) => setLogoDraft((d) => ({ ...d, imageUrl: e.target.value }))}
                              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                              placeholder="https://..."
                              disabled={logoActionLoading}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Alt Text (optional)</label>
                            <input
                              type="text"
                              value={logoDraft.alt}
                              onChange={(e) => setLogoDraft((d) => ({ ...d, alt: e.target.value }))}
                              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                              placeholder="Logo description"
                              disabled={logoActionLoading}
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-3">
                          <button
                            onClick={uploadRecognizedLogo}
                            disabled={logoActionLoading}
                            className="px-4 py-2 rounded-lg bg-[#14b8a6] text-white hover:bg-[#10b3a1] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {logoActionLoading ? 'Uploading...' : 'Upload Logo'}
                          </button>
                        </div>
                      </div>

                      {recognizedLogos.length === 0 ? (
                        <div className="text-center py-12">
                          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No logos uploaded yet</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Logo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Alt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {recognizedLogos.map((logo) => (
                                <tr key={logo._id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                      {logo.imageUrl && (
                                        <img
                                          src={logo.imageUrl}
                                          alt={logo.alt || 'Logo'}
                                          className="w-12 h-12 rounded object-contain bg-white"
                                        />
                                      )}
                                      <div className="text-sm text-gray-600 break-all max-w-xs">{logo.imageUrl}</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">{logo.alt || '-'}</td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{logo.createdAt ? new Date(logo.createdAt).toLocaleDateString() : '-'}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                      <button
                                        className="text-red-600 hover:text-red-900 p-1"
                                        onClick={() => deleteRecognizedLogo(logo._id)}
                                        title="Delete"
                                        disabled={logoActionLoading}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'partners' && (
                  <div>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                          <Image className="w-5 h-5" />
                          <span>Partner Logos</span>
                        </h2>
                        <p className="text-gray-600 mt-1">Upload and manage logos shown in the Partners section.</p>
                      </div>

                      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Logo Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                if (file && file.size > MAX_IMAGE_BYTES) {
                                  setError('Image too large. Max size is 2MB.');
                                  e.target.value = '';
                                  setPartnerLogoDraft((d) => ({ ...d, imageFile: null }));
                                  return;
                                }
                                setPartnerLogoDraft((d) => ({ ...d, imageFile: file }));
                              }}
                              className="mt-1 w-full"
                              disabled={partnerLogoActionLoading}
                            />
                            <p className="text-xs text-gray-500 mt-1">{IMAGE_HELP_TEXT}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
                            <input
                              type="url"
                              value={partnerLogoDraft.imageUrl}
                              onChange={(e) => setPartnerLogoDraft((d) => ({ ...d, imageUrl: e.target.value }))}
                              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                              placeholder="https://..."
                              disabled={partnerLogoActionLoading}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Alt Text (optional)</label>
                            <input
                              type="text"
                              value={partnerLogoDraft.alt}
                              onChange={(e) => setPartnerLogoDraft((d) => ({ ...d, alt: e.target.value }))}
                              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                              placeholder="Logo description"
                              disabled={partnerLogoActionLoading}
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-3">
                          <button
                            onClick={uploadPartnerLogo}
                            disabled={partnerLogoActionLoading}
                            className="px-4 py-2 rounded-lg bg-[#14b8a6] text-white hover:bg-[#10b3a1] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {partnerLogoActionLoading ? 'Uploading...' : 'Upload Logo'}
                          </button>
                        </div>
                      </div>

                      {partnerLogos.length === 0 ? (
                        <div className="text-center py-12">
                          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No logos uploaded yet</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Logo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Alt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {partnerLogos.map((logo) => (
                                <tr key={logo._id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                      {logo.imageUrl && (
                                        <img
                                          src={logo.imageUrl}
                                          alt={logo.alt || 'Logo'}
                                          className="w-12 h-12 rounded object-contain bg-white"
                                        />
                                      )}
                                      <div className="text-sm text-gray-600 break-all max-w-xs">{logo.imageUrl}</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-600">{logo.alt || '-'}</td>
                                  <td className="px-6 py-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-4 h-4" />
                                      <span>{logo.createdAt ? new Date(logo.createdAt).toLocaleDateString() : '-'}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                      <button
                                        className="text-red-600 hover:text-red-900 p-1"
                                        onClick={() => deletePartnerLogo(logo._id)}
                                        title="Delete"
                                        disabled={partnerLogoActionLoading}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;