import React from 'react';
import { Settings } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function AccountOverview() {
  const { accounts } = useStore();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {accounts.map((account) => (
        <div key={account.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={account.profileImage}
              alt={account.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{account.name}</h3>
              <p className="text-sm text-gray-500">
                {account.boardCount} boards
              </p>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Manage Boards
          </button>
        </div>
      ))}
    </div>
  );
}