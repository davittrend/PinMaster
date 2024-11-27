import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CallbackPage from './pages/CallbackPage';
import DashboardPage from './pages/DashboardPage';
import AccountsPage from './pages/AccountsPage';
import ScheduledPinsPage from './pages/ScheduledPinsPage';
import SettingsPage from './pages/SettingsPage';
import { PrivateRoute } from './components/Router/PrivateRoute';
import { AuthRoute } from './components/Router/AuthRoute';

function App() {
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
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/callback" element={<CallbackPage />} />

      {/* Auth routes - redirect to dashboard if already authenticated */}
      <Route path="/auth" element={<AuthRoute><AuthPage /></AuthRoute>} />

      {/* Protected routes - require authentication */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/dashboard/accounts" element={<PrivateRoute><AccountsPage /></PrivateRoute>} />
      <Route path="/dashboard/scheduled" element={<PrivateRoute><ScheduledPinsPage /></PrivateRoute>} />
      <Route path="/dashboard/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
    </Routes>
  </>
);
}

export default App;
