import React, { useState, useEffect } from 'react';
import { userApi, catApi, blogApi } from '../services/api';
import { User, Cat, CatStatistics, Blog, BlogStatistics } from '../types';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [catStats, setCatStats] = useState<CatStatistics | null>(null);
  const [blogStats, setBlogStats] = useState<BlogStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersData, catsData, blogsData, catStatsData, blogStatsData] = await Promise.all([
          userApi.getAll(),
          catApi.getAll(),
          blogApi.getAll(),
          catApi.getStatistics(),
          blogApi.getStatistics(),
        ]);
        
        setUsers(usersData);
        setCats(catsData);
        setBlogs(blogsData);
        setCatStats(catStatsData);
        setBlogStats(blogStatsData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Make sure your NestJS backend is running on port 3000.');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-red-800 mb-2">❌ Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">📊 Dashboard Overview</h2>
      
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* User Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-primary mb-4">👥 Users</h3>
          <div className="text-3xl font-bold text-gray-800 mb-4">{users.length}</div>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Admins: {users.filter(u => u.role === 'admin').length}</p>
            <p>Users: {users.filter(u => u.role === 'user').length}</p>
            <p>Moderators: {users.filter(u => u.role === 'moderator').length}</p>
          </div>
        </div>

        {/* Cat Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-primary mb-4">🐱 Cats</h3>
          <div className="text-3xl font-bold text-gray-800 mb-4">{catStats?.totalCats || 0}</div>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Vaccinated: {catStats?.vaccinatedCats || 0}</p>
            <p>Unvaccinated: {catStats?.unvaccinatedCats || 0}</p>
            <p>Avg Age: {catStats?.averageAge || 0} years</p>
          </div>
        </div>

        {/* Blog Statistics */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-primary mb-4">📝 Blogs</h3>
          <div className="text-3xl font-bold text-gray-800 mb-4">{blogStats?.totalBlogs || 0}</div>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Published: {blogStats?.publishedBlogs || 0}</p>
            <p>Drafts: {blogStats?.draftBlogs || 0}</p>
            <p>Avg Read: {blogStats?.averageReadTime || 0} min</p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-primary mb-4">🏷️ Categories</h3>
          <div className="text-3xl font-bold text-gray-800 mb-4">{blogStats?.categories?.length || 0}</div>
          <div className="space-y-1 text-sm text-gray-600">
            {blogStats?.categories?.slice(0, 3).map((category, index) => (
              <p key={index}>{category}</p>
            ))}
          </div>
        </div>

        {/* Authors */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-primary mb-4">👨‍💻 Authors</h3>
          <div className="text-3xl font-bold text-gray-800 mb-4">{blogStats?.totalAuthors || 0}</div>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Unique authors</p>
            <p>Content creators</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">📋 Recent Activity</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-primary">👥 Latest Users</h4>
            <div className="space-y-3">
              {users.slice(-3).map(user => (
                <div key={user.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-600">({user.role})</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-primary">🐱 Latest Cats</h4>
            <div className="space-y-3">
              {cats.slice(-3).map(cat => (
                <div key={cat.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{cat.name}</div>
                  <div className="text-sm text-gray-600">({cat.breed})</div>
                  <div className="text-xs text-gray-500">
                    {cat.age} years, {cat.weight}kg
                    {cat.isVaccinated ? ' ✅ Vaccinated' : ' ❌ Not Vaccinated'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-primary">📝 Latest Blogs</h4>
            <div className="space-y-3">
              {blogs.slice(-3).map(blog => (
                <div key={blog.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{blog.title}</div>
                  <div className="text-sm text-gray-600">
                    By {blog.author} • {blog.category} • {blog.readTime} min read
                  </div>
                  <div className="text-xs text-gray-500">
                    {blog.isPublished ? ' ✅ Published' : ' 📝 Draft'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">🔧 System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">NestJS Backend: Connected</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">User API: Operational</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Cat API: Operational</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Blog API: Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
