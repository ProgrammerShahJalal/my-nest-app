import React, { useState, useEffect, useCallback } from 'react';
import { catApi } from '../services/api';
import { Cat, CreateCatDto, CatStatistics } from '../types';
import { useToast } from '../contexts/ToastContext';
import ConfirmDialog from './ConfirmDialog';

const catBreeds = [
  'Persian', 'Siamese', 'Maine Coon', 'British Shorthair',
  'Ragdoll', 'Bengal', 'Russian Blue', 'Mixed'
];

const CatManagement: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [stats, setStats] = useState<CatStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCat, setEditingCat] = useState<Cat | null>(null);
  const [filter, setFilter] = useState<'all' | 'vaccinated' | 'unvaccinated'>('all');
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
  const [formData, setFormData] = useState<CreateCatDto>({
    name: '',
    age: 0,
    breed: 'Mixed',
    color: '',
    weight: 0,
    isVaccinated: false,
    owner: '',
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let catsData: Cat[];
      
      switch (filter) {
        case 'vaccinated':
          catsData = await catApi.getVaccinated(true);
          break;
        case 'unvaccinated':
          catsData = await catApi.getVaccinated(false);
          break;
        default:
          catsData = await catApi.getAll();
      }
      
      const statsData = await catApi.getStatistics();
      setCats(catsData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      const errorMessage = 'Failed to fetch cats';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Error fetching cats:', err);
    } finally {
      setLoading(false);
    }
  }, [filter, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCat) {
        const updatedCat = await catApi.update(editingCat.id, formData);
        setCats(cats.map(cat => cat.id === updatedCat.id ? updatedCat : cat));
        showToast('Cat updated successfully!', 'success');
      } else {
        const newCat = await catApi.create(formData);
        setCats([...cats, newCat]);
        showToast('Cat created successfully!', 'success');
      }
      resetForm();
      setError(null);
      fetchData(); // Refresh stats
    } catch (err) {
      const errorMessage = 'Failed to save cat';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Error saving cat:', err);
    }
  };

  const handleEdit = (cat: Cat) => {
    setEditingCat(cat);
    setFormData({
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
      color: cat.color,
      weight: cat.weight,
      isVaccinated: cat.isVaccinated,
      owner: cat.owner || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Cat',
      message: 'Are you sure you want to delete this cat? This action cannot be undone.',
      onConfirm: () => confirmDelete(id)
    });
  };

  const confirmDelete = async (id: number) => {
    try {
      await catApi.delete(id);
      setCats(cats.filter(cat => cat.id !== id));
      setError(null);
      showToast('Cat deleted successfully!', 'success');
      fetchData(); // Refresh stats
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    } catch (err) {
      const errorMessage = 'Failed to delete cat';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error('Error deleting cat:', err);
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: 0,
      breed: 'Mixed',
      color: '',
      weight: 0,
      isVaccinated: false,
      owner: '',
    });
    setEditingCat(null);
    setShowForm(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <div className="text-xl text-gray-600">Loading cats...</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">🐱 Cat Management</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none bg-white cursor-pointer transition-colors"
          >
            <option value="all">All Cats</option>
            <option value="vaccinated">Vaccinated Only</option>
            <option value="unvaccinated">Unvaccinated Only</option>
          </select>
          <button 
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              showForm 
                ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                : 'bg-primary hover:bg-primary/90 text-white hover:shadow-lg'
            }`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '❌ Cancel' : '➕ Add Cat'}
          </button>
        </div>
      </div>

      {/* Statistics Panel */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <span className="block text-sm font-medium text-gray-600 mb-2">Total Cats:</span>
            <span className="text-2xl font-bold text-primary">{stats.totalCats}</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <span className="block text-sm font-medium text-gray-600 mb-2">Vaccinated:</span>
            <span className="text-2xl font-bold text-green-600">{stats.vaccinatedCats}</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <span className="block text-sm font-medium text-gray-600 mb-2">Avg Age:</span>
            <span className="text-2xl font-bold text-blue-600">{stats.averageAge} years</span>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <span className="block text-sm font-medium text-gray-600 mb-2">Avg Weight:</span>
            <span className="text-2xl font-bold text-purple-600">{stats.averageWeight} kg</span>
          </div>
        </div>
      )}

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
            {editingCat ? '✏️ Edit Cat' : '➕ Add New Cat'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Age (years):</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Breed:</label>
                <select
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  {catBreeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Color:</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Weight (kg):</label>
                <input
                  type="number"
                  min="0.5"
                  max="20"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Owner (optional):</label>
                <input
                  type="text"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="vaccinated"
                checked={formData.isVaccinated}
                onChange={(e) => setFormData({ ...formData, isVaccinated: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="vaccinated" className="text-sm font-medium text-gray-700">
                Vaccinated
              </label>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                type="submit" 
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
              >
                {editingCat ? '💾 Update' : '➕ Create'}
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
        {cats.map(cat => (
          <div key={cat.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{cat.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  cat.isVaccinated 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {cat.isVaccinated ? '✅ Vaccinated' : '❌ Not Vaccinated'}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <span className="text-gray-600"><strong>🐾 Breed:</strong> {cat.breed}</span>
                  <span className="text-gray-600"><strong>🎨 Color:</strong> {cat.color}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <span className="text-gray-600"><strong>🎂 Age:</strong> {cat.age} years</span>
                  <span className="text-gray-600"><strong>⚖️ Weight:</strong> {cat.weight} kg</span>
                </div>
                {cat.owner && (
                  <p className="text-sm text-gray-600"><strong>👤 Owner:</strong> {cat.owner}</p>
                )}
                <p className="text-sm text-gray-500">
                  <strong>📅 Added:</strong> {new Date(cat.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
                  onClick={() => handleEdit(cat)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  onClick={() => handleDelete(cat.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cats.length === 0 && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No cats found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? 'Click "Add Cat" to register your first cat.' 
              : `No ${filter} cats found. Try changing the filter.`
            }
          </p>
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

export default CatManagement;
