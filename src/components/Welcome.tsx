import React from 'react';
import { Plus, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';
import PinterestAuth from './PinterestAuth';

export default function Welcome() {
  const { selectedAccount } = useStore();
  const userName = "User"; // In production, this would come from auth
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {userName}!
        </h1>
        <p className="text-gray-600 mb-6">
          Ready to supercharge your Pinterest scheduling?
        </p>
        
        <div className="flex gap-4">
          {!selectedAccount ? (
            <PinterestAuth />
          ) : (
            <>
              <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                <Plus className="w-5 h-5 mr-2" />
                Connect Another Account
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule New Pins
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}