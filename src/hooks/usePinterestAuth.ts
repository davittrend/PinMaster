import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { pinterestApi } from '../services/pinterestApi';
import toast from 'react-hot-toast';

export function usePinterestAuth() {
  const { addAccount, setSelectedAccount } = useStore();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('pinterest_access_token');
      if (!token) return;

      try {
        pinterestApi.setAccessToken(token);
        const profile = await pinterestApi.getUserProfile();
        
        addAccount({
          id: profile.id,
          name: profile.username,
          profileImage: profile.profile_image || '',
          boardCount: 0 // Will be updated when boards are fetched
        });
        
        setSelectedAccount(profile.id);
        
        // Fetch boards
        const boardsData = await pinterestApi.getBoards();
        if (boardsData.items) {
          // Update account with correct board count
          addAccount({
            ...profile,
            boardCount: boardsData.items.length
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('pinterest_access_token');
        toast.error('Pinterest session expired. Please reconnect your account.');
      }
    };

    checkAuth();
  }, [addAccount, setSelectedAccount]);

  return null;
}