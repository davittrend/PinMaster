import React from 'react';
import { ImagePlus, Calendar, Users } from 'lucide-react';

const PINTEREST_CLIENT_ID = '1507772';
const REDIRECT_URI = 'https://prismatic-lebkuchen-c74fe3.netlify.app/callback';
const SCOPE = 'boards:read,pins:read,pins:write';

function Dashboard() {
  const handlePinterestConnect = () => {
    const authUrl = `https://www.pinterest.com/oauth/?client_id=${PINTEREST_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${SCOPE}`;
    window.location.href = authUrl;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Pinterest Scheduler!</h1>
        <p className="text-gray-600 mb-6">Connect your Pinterest account to start scheduling pins.</p>
        <button
          onClick={handlePinterestConnect}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Connect Pinterest Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ImagePlus className="h-8 w-8 text-pink-600 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Upload Content</h2>
          <p className="text-gray-600">Drag and drop your images or select files to upload.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Calendar className="h-8 w-8 text-pink-600 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Schedule Pins</h2>
          <p className="text-gray-600">Plan and schedule your pins for optimal engagement.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Users className="h-8 w-8 text-pink-600 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Manage Accounts</h2>
          <p className="text-gray-600">Connect and manage multiple Pinterest accounts.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;