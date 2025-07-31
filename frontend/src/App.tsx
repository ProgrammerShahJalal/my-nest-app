import React, { useState } from 'react';
import './App.css';
import CatManagement from './components/CatManagement';
import BlogManagement from './components/BlogManagement';
import Dashboard from './components/Dashboard';
import { ToastProvider } from './contexts/ToastContext';
import ToastContainer from './components/ToastContainer';
import UserManagement from './components/UserManagement';

type ActiveTab = 'dashboard' | 'users' | 'cats' | 'blogs';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'cats':
        return <CatManagement />;
      case 'blogs':
        return <BlogManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="gradient-bg text-white p-4 md:p-8 shadow-lg">
          <h1 className="mb-4 text-2xl md:text-3xl font-bold text-center">
            🚀 NestJS Management System
          </h1>
          <nav className="flex justify-center gap-2 md:gap-4 flex-wrap">
            <button
              className={`glass-button px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/30 hover:-translate-y-1 ${
                activeTab === 'dashboard' ? 'bg-white text-green-400 border-white' : 'text-white'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`glass-button px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/30 hover:-translate-y-1 ${
                activeTab === 'users' ? 'bg-white text-green-400 border-white' : 'text-white'
              }`}
              onClick={() => setActiveTab('users')}
            >
              👥 Users
            </button>
            <button
              className={`glass-button px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/30 hover:-translate-y-1 ${
                activeTab === 'cats' ? 'bg-white text-green-400 border-white' : 'text-white'
              }`}
              onClick={() => setActiveTab('cats')}
            >
              🐱 Cats
            </button>
            <button
              className={`glass-button px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/30 hover:-translate-y-1 ${
                activeTab === 'blogs' ? 'bg-white text-green-400 border-white' : 'text-white'
              }`}
              onClick={() => setActiveTab('blogs')}
            >
              📝 Blogs
            </button>
          </nav>
        </header>
        
        <main className="container mx-auto p-4 md:p-8 max-w-7xl">
          <div className="fade-in">
            {renderContent()}
          </div>
        </main>
        
        <ToastContainer />
      </div>
    </ToastProvider>
  );
};

export default App;
