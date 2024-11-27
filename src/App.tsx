import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFirebaseAuth } from './hooks/useFirebaseAuth';
import { PrivateRoute } from './components/Router/PrivateRoute';
import { AuthRoute } from './components/Router/AuthRoute';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CallbackPage from './pages/CallbackPage';
import DashboardPage from './pages/DashboardPage';
import AccountsPage from './pages/AccountsPage';
import ScheduledPinsPage from './pages/ScheduledPinsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { user } = useFirebaseAuth();

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
          element={
            user ? <Navigate to="/dashboard" replace /> : <HomePage />
          } 
        />
        <Route 
          path="/auth" 
          element={
            <AuthRoute>
              <AuthPage />
            </AuthRoute>
          } 
        />
        <Route path="/callback" element={<CallbackPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/accounts" 
          element={
            <PrivateRoute>
              <AccountsPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/scheduled" 
          element={
            <PrivateRoute>
              <ScheduledPinsPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/settings" 
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
