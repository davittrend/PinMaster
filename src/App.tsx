import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CallbackPage from './pages/CallbackPage';
import DashboardPage from './pages/DashboardPage';
import AccountsPage from './pages/AccountsPage';
import ScheduledPinsPage from './pages/ScheduledPinsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { user, loading } = useFirebaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          success: {
            style: {
              background: '#10B981',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
            },
            duration: 6000,
          },
        }}
      />
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <HomePage />} 
        />
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
        />
        <Route path="/callback" element={<CallbackPage />} />
        <Route 
          path="/dashboard" 
          element={!user ? <Navigate to="/auth" replace /> : <DashboardPage />} 
        />
        <Route 
          path="/dashboard/accounts" 
          element={!user ? <Navigate to="/auth" replace /> : <AccountsPage />} 
        />
        <Route 
          path="/dashboard/scheduled" 
          element={!user ? <Navigate to="/auth" replace /> : <ScheduledPinsPage />} 
        />
        <Route 
          path="/dashboard/settings" 
          element={!user ? <Navigate to="/auth" replace /> : <SettingsPage />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
