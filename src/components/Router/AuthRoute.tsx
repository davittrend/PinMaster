import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';

interface AuthRouteProps {
children: React.ReactNode;
}

export function AuthRoute({ children }: AuthRouteProps) {
const { user, loading } = useFirebaseAuth();
const location = useLocation();
const from = location.state?.from?.pathname || '/dashboard';

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
    </div>
  );
}

if (user) {
  return <Navigate to={from} replace />;
}

return <>{children}</>;
}
