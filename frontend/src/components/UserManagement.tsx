import React, { useState, useEffect } from 'react';
import { userApi } from '../services/api';
import { User, CreateUserDto, UpdateUserDto } from '../types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateUserDto>({
    name: '',
    email: '',
    age: 0,
    role: 'user',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userApi.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const updatedUser = await userApi.update(editingUser.id, formData);
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      } else {
        const newUser = await userApi.create(formData);
        setUsers([...users, newUser]);
      }
      resetForm();
      setError(null);
    } catch (err) {
      setError('Failed to save user');
      console.error('Error saving user:', err);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
      role: user.role,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userApi.delete(id);
        setUsers(users.filter(user => user.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', age: 0, role: 'user' });
    setEditingUser(null);
    setShowForm(false);
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="user-management">
      <div className="header">
        <h2>👥 User Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancel' : '➕ Add User'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)}>✖</button>
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <h3>{editingUser ? '✏️ Edit User' : '➕ Add New User'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Role:</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-success">
                {editingUser ? '💾 Update' : '➕ Create'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <h3>{user.name}</h3>
              <span className={`role-badge role-${user.role}`}>
                {user.role}
              </span>
            </div>
            
            <div className="user-details">
              <p><strong>📧 Email:</strong> {user.email}</p>
              <p><strong>🎂 Age:</strong> {user.age} years</p>
              <p><strong>📅 Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            
            <div className="user-actions">
              <button 
                className="btn btn-edit"
                onClick={() => handleEdit(user)}
              >
                ✏️ Edit
              </button>
              <button 
                className="btn btn-delete"
                onClick={() => handleDelete(user.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && !loading && (
        <div className="empty-state">
          <h3>No users found</h3>
          <p>Click "Add User" to create your first user.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
