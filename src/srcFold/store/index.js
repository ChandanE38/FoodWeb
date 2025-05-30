import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
  preloadedState: {
    auth: {
      user: null,
      isAuthenticated: false,
      loading: false,
      errorMessage: null,
      successMessage: null
    },
    cart: {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
      loading: false,
      error: null
    }
  }
});

export default store; 