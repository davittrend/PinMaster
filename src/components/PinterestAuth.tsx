import React from 'react';
import { LogIn } from 'lucide-react';
import { pinterestApi } from '../services/pinterestApi';
import { useStore } from '../store/useStore';

export default function PinterestAuth() {
  const handleLogin = () => {
    window.location.href = pinterestApi.getAuthUrl();
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      <LogIn className="w-5 h-5 mr-2" />
      Connect with Pinterest
    </button>
  );
}