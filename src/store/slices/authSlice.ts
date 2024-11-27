import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinterestAuth } from '../../hooks/useAuth';

interface AuthState {
isAuthenticated: boolean;
pinterestAccounts: PinterestAuth[];
selectedAccount: PinterestAuth | null;
isLoading: boolean;
error: string | null;
}

const initialState: AuthState = {
isAuthenticated: false,
pinterestAccounts: [],
selectedAccount: null,
isLoading: false,
error: null,
};

const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
  setAuth: (state, action: PayloadAction<PinterestAuth>) => {
    state.isAuthenticated = true;
    // Add the new account to the accounts array if it doesn't exist
    const accountExists = state.pinterestAccounts.some(
      account => account.id === action.payload.id
    );
    if (!accountExists) {
      state.pinterestAccounts.push(action.payload);
    }
    state.selectedAccount = action.payload;
    state.error = null;
  },
  removePinterestAccount: (state, action: PayloadAction<string>) => {
    state.pinterestAccounts = state.pinterestAccounts.filter(
      account => account.id !== action.payload
    );
    if (state.selectedAccount?.id === action.payload) {
      state.selectedAccount = state.pinterestAccounts[0] || null;
    }
    if (state.pinterestAccounts.length === 0) {
      state.isAuthenticated = false;
    }
  },
  setSelectedAccount: (state, action: PayloadAction<string>) => {
    const account = state.pinterestAccounts.find(acc => acc.id === action.payload);
    if (account) {
      state.selectedAccount = account;
    }
  },
  setLoading: (state, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  setError: (state, action: PayloadAction<string>) => {
    state.error = action.payload;
    state.isLoading = false;
  },
  logout: (state) => {
    state.isAuthenticated = false;
    state.pinterestAccounts = [];
    state.selectedAccount = null;
    state.error = null;
  },
},
});

export const { 
setAuth, 
setLoading, 
setError, 
logout, 
removePinterestAccount,
setSelectedAccount 
} = authSlice.actions;

export default authSlice.reducer;
