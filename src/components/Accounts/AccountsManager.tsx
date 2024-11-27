import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircleUserRound, Plus, Trash2 } from 'lucide-react';
import { RootState } from '../../store/store';
import { AccountSelector } from './AccountSelector';
import { BoardsList } from './BoardsList';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export function AccountsManager() {
  const dispatch = useDispatch();
  const { handleAuth } = useAuth();
  const { pinterestAccounts } = useSelector((state: RootState) => state.auth);
  const { items: boards } = useSelector((state: RootState) => state.boards);

  const handleAddAccount = async () => {
    try {
      await handleAuth();
    } catch (error) {
      console.error('Failed to add account:', error);
      toast.error('Failed to add Pinterest account');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Pinterest Accounts</h2>
          <button
            onClick={handleAddAccount}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </button>
        </div>

        {pinterestAccounts.length === 0 ? (
          <div className="text-center py-12">
            <CircleUserRound className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No accounts connected</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by connecting your Pinterest account.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <AccountSelector />
            <BoardsList boards={boards} />
          </div>
        )}
      </div>
    </div>
  );
}
