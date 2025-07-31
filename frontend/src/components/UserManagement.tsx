import React, { useState, useEffect, useCallback } from 'react';
import { userApi } from '../services/api';
import { User, CreateUserDto } from '../types';
import { useToast } from '../contexts/ToastContext';
import ConfirmDialog from './ConfirmDialog';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
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
  const [formData, setFormData] = useState<CreateUserDto>({
    name: '',
    email: '',
    age: 0,
    role: 'user',
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const usersData = await userApi.getAll();
      setUsers(usersData);
      setError(null);
    } catch (err) {
      const errorMessage = 'Failed to fetch users';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        const updatedUser = await userApi.update(editingUser.id, formData);
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        showToast('User updated successfully!', 'success');
      } else {
        const newUser = await userApi.create(formData);
        setUsers([...users, newUser]);
        showToast('User created successfully!', 'success');
      }
      resetForm();
      setError(null);
    } catch (err) {
      const errorMessage = 'Failed to save user';
      setError(errorMessage);
      showToast(errorMessage, 'error');
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

  const handleDelete = (id: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete User',
      message: 'Are you sure you want to delete this user? This action cannot be undone.',
      onConfirm: () => confirmDelete(id)
    });
  };

  const confirmDelete = async (id: number) => {
    try {
      await userApi.delete(id);
      setUsers(users.filter(user => user.id !== id));
      setError(null);
      showToast('User deleted successfully!', 'success');
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    } catch (err) {
      const errorMessage = 'Failed to delete user';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Error deleting user:', err);
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', age: 0, role: 'user' });
    setEditingUser(null);
    setShowForm(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <div className="text-xl text-gray-600">Loading users...</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">👥 User Management</h2>
        <button 
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            showForm 
              ? 'bg-gray-600 hover:bg-gray-700 text-white' 
              : 'bg-primary hover:bg-primary/90 text-white hover:shadow-lg'
          }`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancel' : '➕ Add User'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex justify-between items-center">
          <span className="text-red-800">❌ {error}</span>
          <button 
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800 text-xl font-bold"
          >
            ✖
          </button>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {editingUser ? '✏️ Edit User' : '➕ Add New User'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  👤 Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  📧 Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  🎂 Age *
                </label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter age"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  🔰 Role *
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                type="submit" 
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
              >
                {editingUser ? '💾 Update' : '➕ Create'}
              </button>
              <button 
                type="button" 
                onClick={resetForm}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                </span>
              </div>
              
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-600">
                  <strong>📧 Email:</strong> {user.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>🎂 Age:</strong> {user.age} years
                </p>
                <p className="text-sm text-gray-500">
                  <strong>📅 Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
                  onClick={() => handleEdit(user)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  onClick={() => handleDelete(user.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
          <p className="text-gray-600">Click "Add User" to create your first user.</p>
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

export default UserManagement;
