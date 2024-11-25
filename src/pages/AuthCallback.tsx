import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { pinterestApi } from '../services/pinterestApi';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addAccount, setBoards } = useStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error || !code || !state) {
          const errorMsg = errorDescription || 'Authorization failed';
          console.error('OAuth error:', { error, errorDescription });
          toast.error(errorMsg);
          navigate('/');
          return;
        }

        try {
          await pinterestApi.exchangeCodeForToken(code, state);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Failed to connect to Pinterest';
          toast.error(errorMsg);
          navigate('/');
          return;
        }

        const [profile, boardsData] = await Promise.all([
          pinterestApi.getUserProfile(),
          pinterestApi.getBoards()
        ]);

        const userData = {
          id: profile.id,
          name: profile.username,
          profileImage: profile.profile_image || '',
          boardCount: boardsData.items?.length || 0
        };

        localStorage.setItem('pinterest_user', JSON.stringify(userData));
        localStorage.setItem('pinterest_boards', JSON.stringify(boardsData.items || []));

        addAccount(userData);
        setBoards(boardsData.items?.map(board => ({
          id: board.id,
          name: board.name,
          description: board.description || '',
          pinCount: board.pin_count || 0,
          selected: false
        })) || []);

        toast.success('Successfully connected to Pinterest!');
        navigate('/');
      } catch (error) {
        console.error('Authentication error:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to connect to Pinterest');
        navigate('/');
      }
    };

    handleCallback();
  }, [location, navigate, addAccount, setBoards]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Connecting to Pinterest...</p>
      </div>
    </div>
  );
}