import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Welcome from '../components/Welcome';
import AccountOverview from '../components/AccountOverview';
import FileUpload from '../components/FileUpload';
import BoardSelector from '../components/BoardSelector';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-900">
              Pinterest Scheduler
            </h1>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Welcome />
        <AccountOverview />
        <FileUpload />
        <BoardSelector />
      </main>
    </div>
  );
}