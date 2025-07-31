import React, { useState, useEffect } from 'react';
import { userApi, catApi } from '../services/api';
import { User, Cat, CatStatistics } from '../types';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [catStats, setCatStats] = useState<CatStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersData, catsData, statsData] = await Promise.all([
          userApi.getAll(),
          catApi.getAll(),
          catApi.getStatistics(),
        ]);
        
        setUsers(usersData);
        setCats(catsData);
        setCatStats(statsData);
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
      <div className="dashboard">
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error">
          <h3>❌ Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>🔄 Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>📊 Dashboard Overview</h2>
      
      <div className="stats-grid">
        {/* User Statistics */}
        <div className="stat-card">
          <h3>👥 Users</h3>
          <div className="stat-number">{users.length}</div>
          <div className="stat-details">
            <p>Admins: {users.filter(u => u.role === 'admin').length}</p>
            <p>Users: {users.filter(u => u.role === 'user').length}</p>
            <p>Moderators: {users.filter(u => u.role === 'moderator').length}</p>
          </div>
        </div>

        {/* Cat Statistics */}
        <div className="stat-card">
          <h3>🐱 Cats</h3>
          <div className="stat-number">{catStats?.totalCats || 0}</div>
          <div className="stat-details">
            <p>Vaccinated: {catStats?.vaccinatedCats || 0}</p>
            <p>Unvaccinated: {catStats?.unvaccinatedCats || 0}</p>
            <p>Avg Age: {catStats?.averageAge || 0} years</p>
          </div>
        </div>

        {/* Breeds */}
        <div className="stat-card">
          <h3>🏷️ Cat Breeds</h3>
          <div className="stat-number">{catStats?.breeds?.length || 0}</div>
          <div className="stat-details">
            {catStats?.breeds?.slice(0, 3).map((breed, index) => (
              <p key={index}>{breed}</p>
            ))}
          </div>
        </div>

        {/* Weight Stats */}
        <div className="stat-card">
          <h3>⚖️ Average Weight</h3>
          <div className="stat-number">{catStats?.averageWeight || 0} kg</div>
          <div className="stat-details">
            <p>Total cats tracked</p>
            <p>Health monitoring</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>📋 Recent Activity</h3>
        <div className="activity-grid">
          <div className="activity-section">
            <h4>👥 Latest Users</h4>
            <ul>
              {users.slice(-3).map(user => (
                <li key={user.id}>
                  <strong>{user.name}</strong> ({user.role})
                  <br />
                  <small>{user.email}</small>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="activity-section">
            <h4>🐱 Latest Cats</h4>
            <ul>
              {cats.slice(-3).map(cat => (
                <li key={cat.id}>
                  <strong>{cat.name}</strong> ({cat.breed})
                  <br />
                  <small>
                    {cat.age} years, {cat.weight}kg, 
                    {cat.isVaccinated ? ' ✅ Vaccinated' : ' ❌ Not Vaccinated'}
                  </small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="system-status">
        <h3>🔧 System Status</h3>
        <div className="status-item">
          <span className="status-indicator green"></span>
          <span>NestJS Backend: Connected</span>
        </div>
        <div className="status-item">
          <span className="status-indicator green"></span>
          <span>User API: Operational</span>
        </div>
        <div className="status-item">
          <span className="status-indicator green"></span>
          <span>Cat API: Operational</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
