import React, { useState, useEffect, useCallback } from 'react';
import { blogApi } from '../services/api';
import { Blog, CreateBlogDto, BlogStatistics } from '../types';
import { useToast } from '../contexts/ToastContext';
import ConfirmDialog from './ConfirmDialog';

const blogCategories = [
  'Technology', 'Health', 'Lifestyle', 'Business', 
  'Education', 'Entertainment', 'Travel', 'Food', 'Other'
];

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stats, setStats] = useState<BlogStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [viewingBlog, setViewingBlog] = useState<Blog | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });
  const { showToast } = useToast();
  const [formData, setFormData] = useState<CreateBlogDto>({
    title: '',
    content: '',
    author: '',
    category: 'Technology',
    tags: [],
    isPublished: false,
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let blogsData: Blog[];
      
      switch (filter) {
        case 'published':
          blogsData = await blogApi.getPublished();
          break;
        case 'draft':
          const allBlogs = await blogApi.getAll();
          blogsData = allBlogs.filter(blog => !blog.isPublished);
          break;
        default:
          blogsData = await blogApi.getAll();
      }
      
      const statsData = await blogApi.getStatistics();
      setBlogs(blogsData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      const errorMessage = 'Failed to fetch blogs data';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [filter, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearSearch = () => {
    setSearchQuery('');
    fetchData();
  };

  const handleFilterChange = (newFilter: 'all' | 'published' | 'draft') => {
    setFilter(newFilter);
    // Clear search when filter changes
    if (searchQuery.trim()) {
      setSearchQuery('');
    }
  };

  // Add real-time search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        try {
          setLoading(true);
          const searchResults = await blogApi.search(searchQuery.trim());
          setBlogs(searchResults);
          setError(null);
        } catch (err) {
          const errorMessage = 'Search failed';
          setError(errorMessage);
          console.error('Search error:', err);
        } finally {
          setLoading(false);
        }
      } else {
        // If search is empty, reload data based on current filter
        fetchData();
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery, fetchData]); // Include fetchData dependency

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'tags') {
      // Handle tags as comma-separated string
      const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      setFormData(prev => ({ ...prev, tags }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingBlog) {
        await blogApi.update(editingBlog.id, formData);
        showToast('Blog updated successfully!', 'success');
      } else {
        await blogApi.create(formData);
        showToast('Blog created successfully!', 'success');
      }
      await fetchData();
      resetForm();
      setError(null);
    } catch (err) {
      const errorMessage = editingBlog ? 'Failed to update blog' : 'Failed to create blog';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Error submitting blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      isPublished: blog.isPublished,
      readTime: blog.readTime,
    });
    setShowForm(true);
  };

  const handleViewDetails = (blog: Blog) => {
    setViewingBlog(blog);
  };

  const closeDetails = () => {
    setViewingBlog(null);
  };

  const handleDelete = (id: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Blog',
      message: 'Are you sure you want to delete this blog? This action cannot be undone.',
      onConfirm: () => confirmDelete(id)
    });
  };

  const confirmDelete = async (id: number) => {
    try {
      setLoading(true);
      await blogApi.delete(id);
      await fetchData();
      setError(null);
      showToast('Blog deleted successfully!', 'success');
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    } catch (err) {
      const errorMessage = 'Failed to delete blog';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Error deleting blog:', err);
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      category: 'Technology',
      tags: [],
      isPublished: false,
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  if (loading && blogs.length === 0) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <div className="text-xl text-gray-600">Loading blogs...</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-xl font-semibold text-red-800">Error: {error}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Blog Management</h2>
        <button 
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            showForm 
              ? 'bg-gray-600 hover:bg-gray-700 text-white' 
              : 'bg-primary hover:bg-primary/90 text-white hover:shadow-lg'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => setShowForm(!showForm)}
          disabled={loading}
        >
          {showForm ? 'Cancel' : 'Add New Blog'}
        </button>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Blogs</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalBlogs}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Published</h3>
            <p className="text-2xl font-bold text-green-600">{stats.publishedBlogs}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Drafts</h3>
            <p className="text-2xl font-bold text-yellow-600">{stats.draftBlogs}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Authors</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.totalAuthors}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Categories</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.categories.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Read Time</h3>
            <p className="text-2xl font-bold text-indigo-600">{stats.averageReadTime} min</p>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex flex-1 gap-2 w-full lg:w-auto min-w-0">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search blogs (real-time)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
          {searchQuery && (
            <button 
              onClick={clearSearch} 
              disabled={loading}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
              title="Clear search"
            >
              ✖
            </button>
          )}
        </div>
        
        <div className="w-full lg:w-auto">
          <select 
            value={filter} 
            onChange={(e) => handleFilterChange(e.target.value as 'all' | 'published' | 'draft')}
            disabled={loading}
            className="w-full lg:w-auto px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none bg-white cursor-pointer transition-colors"
          >
            <option value="all">All Blogs</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Blog Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            {editingBlog ? 'Edit Blog' : 'Add New Blog'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  📝 Blog Title *
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                  👤 Author *
                </label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  📂 Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none bg-white cursor-pointer transition-colors"
                >
                  {blogCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  🏷️ Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  name="tags"
                  placeholder="e.g., react, javascript, tutorial"
                  value={formData.tags?.join(', ') || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-500">Separate multiple tags with commas</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                📄 Blog Content *
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your blog content here..."
                value={formData.content}
                onChange={handleInputChange}
                rows={8}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-vertical transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">
                  ⏱️ Read Time (minutes)
                </label>
                <input
                  id="readTime"
                  type="number"
                  name="readTime"
                  placeholder="e.g., 5"
                  value={formData.readTime || ''}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  📤 Publishing Options
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished || false}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-gray-700 font-medium">Publish immediately</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                type="submit" 
                className="flex-1 md:flex-none px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 font-medium transition-colors" 
                disabled={loading}
              >
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </button>
              <button 
                type="button" 
                className="flex-1 md:flex-none px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors" 
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            {searchQuery ? `Search Results (${blogs.length})` : `Blogs (${blogs.length})`}
          </h3>
          {searchQuery && (
            <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
              🔍 Searching for: "<span className="font-medium text-blue-800">{searchQuery}</span>"
            </div>
          )}
        </div>
        {blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? (
              <div>
                <p className="text-lg mb-2">No blogs found matching your search.</p>
                <p className="text-sm">Try different keywords or clear the search to see all blogs.</p>
              </div>
            ) : (
              <p className="text-lg">No blogs found.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary">
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">{blog.title}</h4>
                  <div className="flex gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 leading-relaxed">{truncateContent(blog.content)}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="font-medium">By: {blog.author}</div>
                  <div>Read time: {blog.readTime} min</div>
                  <div>Created: {formatDate(blog.createdAt)}</div>
                  {blog.publishedAt && (
                    <div>Published: {formatDate(blog.publishedAt)}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors text-sm" 
                    onClick={() => handleViewDetails(blog)}
                    disabled={loading}
                  >
                    📄 Details
                  </button>
                  <button 
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium transition-colors text-sm" 
                    onClick={() => handleEdit(blog)}
                    disabled={loading}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium transition-colors text-sm" 
                    onClick={() => handleDelete(blog.id)}
                    disabled={loading}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blog Details Modal */}
      {viewingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">{viewingBlog.title}</h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      viewingBlog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {viewingBlog.isPublished ? '✅ Published' : '📝 Draft'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                      📂 {viewingBlog.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      ⏱️ {viewingBlog.readTime} min read
                    </span>
                  </div>
                </div>
                <button 
                  onClick={closeDetails}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold p-2"
                >
                  ✖
                </button>
              </div>

              {/* Author and Dates */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">👤 Author:</span>
                    <p className="text-gray-600">{viewingBlog.author}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">📅 Created:</span>
                    <p className="text-gray-600">{formatDate(viewingBlog.createdAt)}</p>
                  </div>
                  {viewingBlog.publishedAt && (
                    <div>
                      <span className="font-medium text-gray-700">🚀 Published:</span>
                      <p className="text-gray-600">{formatDate(viewingBlog.publishedAt)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {viewingBlog.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">🏷️ Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingBlog.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">📄 Content</h4>
                <div className="prose max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {viewingBlog.content}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button 
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                  onClick={() => {
                    closeDetails();
                    handleEdit(viewingBlog);
                  }}
                >
                  ✏️ Edit Blog
                </button>
                <button 
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors"
                  onClick={closeDetails}
                >
                  ❌ Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />
    </div>
  );
};

export default BlogManagement;
