import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinterestAuth } from '../../hooks/useAuth';

interface AuthState {
  isAuthenticated: boolean;
  userData: PinterestAuth | null;
  isLoading: boolean;
  error: string | null;
  pinterestAccounts: PinterestAuth[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  isLoading: false,
  error: null,
  pinterestAccounts: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<PinterestAuth>) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.error = null;
      
      // Add to Pinterest accounts if not already present
      const exists = state.pinterestAccounts.some(
        account => account.user.username === action.payload.user.username
      );
      if (!exists) {
        state.pinterestAccounts.push(action.payload);
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
      state.userData = null;
      state.error = null;
    },
    removePinterestAccount: (state, action: PayloadAction<string>) => {
      state.pinterestAccounts = state.pinterestAccounts.filter(
        account => account.user.username !== action.payload
      );
      if (state.userData?.user.username === action.payload) {
        state.userData = state.pinterestAccounts[0] || null;
        state.isAuthenticated = !!state.pinterestAccounts[0];
      }
    },
  },
});

export const { 
  setAuth, 
  setLoading, 
  setError, 
  logout,
  removePinterestAccount 
} = authSlice.actions;

export default authSlice.reducer;
