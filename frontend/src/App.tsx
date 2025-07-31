import React, { useState } from 'react';
import './App.css';
import UserManagement from './components/UserManagement';
import CatManagement from './components/CatManagement';
import Dashboard from './components/Dashboard';

type ActiveTab = 'dashboard' | 'users' | 'cats';

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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 NestJS Management System</h1>
        <nav className="navigation">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button
            className={activeTab === 'cats' ? 'active' : ''}
            onClick={() => setActiveTab('cats')}
          >
            🐱 Cats
          </button>
        </nav>
      </header>
      
      <main className="App-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
