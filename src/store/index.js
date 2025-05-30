import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Create the store with explicit initial state
const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: {
    auth: {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    }
  }
});

// Verify store initialization
console.log('Initial Redux State:', store.getState());

export default store; 