import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDown, Trash2 } from 'lucide-react';
import { RootState } from '../../store/store';
import { setAuth, removePinterestAccount } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

export function AccountSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { userData, pinterestAccounts } = useSelector((state: RootState) => state.auth);

  const handleAccountSwitch = (account: any) => {
    dispatch(setAuth(account));
    setIsOpen(false);
    toast.success(`Switched to ${account.user.username}`);
  };

  const handleRemoveAccount = (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this Pinterest account?')) {
      dispatch(removePinterestAccount(username));
      toast.success('Pinterest account removed');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
      >
        <div className="flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${userData?.user?.username}&background=red&color=fff`}
            alt={userData?.user?.username}
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-3 font-medium">{userData?.user?.username}</span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          {pinterestAccounts.map((account) => (
            <div
              key={account.user.username}
              onClick={() => handleAccountSwitch(account)}
              className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${account.user.username}&background=red&color=fff`}
                  alt={account.user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-3">{account.user.username}</span>
              </div>
              {pinterestAccounts.length > 1 && (
                <button
                  onClick={(e) => handleRemoveAccount(e, account.user.username)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
