import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import AuthCallback from './pages/AuthCallback';
import { useStore } from './store/useStore';

export default function App() {
  const { addAccount, setBoards } = useStore();

  useEffect(() => {
    // Restore user data from localStorage on app load
    const savedUser = localStorage.getItem('pinterest_user');
    const savedBoards = localStorage.getItem('pinterest_boards');

    if (savedUser) {
      addAccount(JSON.parse(savedUser));
    }

    if (savedBoards) {
      const boards = JSON.parse(savedBoards);
      setBoards(boards.map((board: any) => ({
        id: board.id,
        name: board.name,
        description: board.description || '',
        pinCount: board.pin_count || 0,
        selected: false
      })));
    }
  }, [addAccount, setBoards]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}