import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

interface AuthRouteProps {
  children: React.ReactNode;
}

export function AuthRoute({ children }: AuthRouteProps) {
  const { user, loading } = useFirebaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}
