import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Callback() {
  const [status, setStatus] = useState('Connecting to Pinterest...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if (!code) {
          throw new Error('No authorization code received');
        }

        // Store the code temporarily - in production you'd send this to your backend
        localStorage.setItem('pinterest_auth_code', code);
        setStatus('Successfully connected to Pinterest!');
        
        // Redirect back to dashboard after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        setStatus('Failed to connect to Pinterest');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{status}</h2>
        <p className="text-gray-600">You will be redirected shortly...</p>
      </div>
    </div>
  );
}

export default Callback;