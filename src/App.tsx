import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import DestinationsPage from './components/DestinationsPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onViewChange={setCurrentView} />;
      case 'destinations':
        return <DestinationsPage onViewChange={setCurrentView} />;
      case 'flights':
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Flights</h1>
            <p className="text-gray-600">Flight booking functionality coming soon!</p>
          </div>
        </div>;
      case 'hotels':
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Hotels</h1>
            <p className="text-gray-600">Hotel booking functionality coming soon!</p>
          </div>
        </div>;
      case 'bookings':
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h1>
            <p className="text-gray-600">Your bookings will appear here!</p>
          </div>
        </div>;
      case 'login':
        return <LoginPage onViewChange={setCurrentView} />;
      case 'admin':
        return <AdminPage onViewChange={setCurrentView} />;
      default:
        return <HomePage onViewChange={setCurrentView} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="App">
          <Navbar currentView={currentView} onViewChange={setCurrentView} />
          {renderCurrentView()}
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;