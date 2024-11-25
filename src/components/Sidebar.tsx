import React from 'react';
import { Users, Image, X, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { pinterestApi } from '../services/pinterestApi';
import toast from 'react-hot-toast';

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { accounts } = useStore();

  const handleLogout = () => {
    pinterestApi.logout();
    window.location.reload();
    toast.success('Logged out successfully');
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out z-30`}
    >
      <div className="p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="mt-8">
          <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Connected Accounts
          </h3>
          <div className="mt-2 space-y-1">
            {accounts.map(account => (
              <div key={account.id} className="flex items-center px-4 py-2 text-gray-700">
                <img
                  src={account.profileImage}
                  alt={account.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-gray-500">{account.boardCount} boards</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          <a
            href="#accounts"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Users className="w-5 h-5 mr-3" />
            My Accounts
          </a>
          <a
            href="#pins"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Image className="w-5 h-5 mr-3" />
            My Pins
          </a>
        </nav>

        {accounts.length > 0 && (
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg mt-4 w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}