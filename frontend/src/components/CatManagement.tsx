import React, { useState, useEffect } from 'react';
import { catApi } from '../services/api';
import { Cat, CreateCatDto, UpdateCatDto, CatStatistics } from '../types';

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
  const [formData, setFormData] = useState<CreateCatDto>({
    name: '',
    age: 0,
    breed: 'Mixed',
    color: '',
    weight: 0,
    isVaccinated: false,
    owner: '',
  });

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
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
      setError('Failed to fetch cats');
      console.error('Error fetching cats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCat) {
        const updatedCat = await catApi.update(editingCat.id, formData);
        setCats(cats.map(cat => cat.id === updatedCat.id ? updatedCat : cat));
      } else {
        const newCat = await catApi.create(formData);
        setCats([...cats, newCat]);
      }
      resetForm();
      setError(null);
      fetchData(); // Refresh stats
    } catch (err) {
      setError('Failed to save cat');
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

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this cat?')) {
      try {
        await catApi.delete(id);
        setCats(cats.filter(cat => cat.id !== id));
        setError(null);
        fetchData(); // Refresh stats
      } catch (err) {
        setError('Failed to delete cat');
        console.error('Error deleting cat:', err);
      }
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

  if (loading) return <div className="loading">Loading cats...</div>;

  return (
    <div className="cat-management">
      <div className="header">
        <h2>🐱 Cat Management</h2>
        <div className="header-actions">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">All Cats</option>
            <option value="vaccinated">Vaccinated Only</option>
            <option value="unvaccinated">Unvaccinated Only</option>
          </select>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '❌ Cancel' : '➕ Add Cat'}
          </button>
        </div>
      </div>

      {/* Statistics Panel */}
      {stats && (
        <div className="stats-panel">
          <div className="stat-item">
            <span className="stat-label">Total Cats:</span>
            <span className="stat-value">{stats.totalCats}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Vaccinated:</span>
            <span className="stat-value">{stats.vaccinatedCats}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Avg Age:</span>
            <span className="stat-value">{stats.averageAge} years</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Avg Weight:</span>
            <span className="stat-value">{stats.averageWeight} kg</span>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <span>❌ {error}</span>
          <button onClick={() => setError(null)}>✖</button>
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <h3>{editingCat ? '✏️ Edit Cat' : '➕ Add New Cat'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
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
                <label>Age (years):</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Breed:</label>
                <select
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                >
                  {catBreeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Color:</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Weight (kg):</label>
                <input
                  type="number"
                  min="0.5"
                  max="20"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Owner (optional):</label>
                <input
                  type="text"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                />
              </div>
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isVaccinated}
                  onChange={(e) => setFormData({ ...formData, isVaccinated: e.target.checked })}
                />
                Vaccinated
              </label>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-success">
                {editingCat ? '💾 Update' : '➕ Create'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="cats-grid">
        {cats.map(cat => (
          <div key={cat.id} className="cat-card">
            <div className="cat-header">
              <h3>{cat.name}</h3>
              <div className="cat-badges">
                <span className={`vaccination-badge ${cat.isVaccinated ? 'vaccinated' : 'unvaccinated'}`}>
                  {cat.isVaccinated ? '✅ Vaccinated' : '❌ Not Vaccinated'}
                </span>
              </div>
            </div>
            
            <div className="cat-details">
              <div className="detail-row">
                <span><strong>🐾 Breed:</strong> {cat.breed}</span>
                <span><strong>🎨 Color:</strong> {cat.color}</span>
              </div>
              <div className="detail-row">
                <span><strong>🎂 Age:</strong> {cat.age} years</span>
                <span><strong>⚖️ Weight:</strong> {cat.weight} kg</span>
              </div>
              {cat.owner && (
                <p><strong>👤 Owner:</strong> {cat.owner}</p>
              )}
              <p><strong>📅 Added:</strong> {new Date(cat.createdAt).toLocaleDateString()}</p>
            </div>
            
            <div className="cat-actions">
              <button 
                className="btn btn-edit"
                onClick={() => handleEdit(cat)}
              >
                ✏️ Edit
              </button>
              <button 
                className="btn btn-delete"
                onClick={() => handleDelete(cat.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {cats.length === 0 && !loading && (
        <div className="empty-state">
          <h3>No cats found</h3>
          <p>
            {filter === 'all' 
              ? 'Click "Add Cat" to register your first cat.' 
              : `No ${filter} cats found. Try changing the filter.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CatManagement;
