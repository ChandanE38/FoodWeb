import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  errorMessage: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.errorMessage = null;
      state.successMessage = 'Login successful!';
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
      state.successMessage = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.errorMessage = null;
      state.successMessage = null;
    },
    signupStart: (state) => {
      state.loading = true;
      state.errorMessage = null;
      state.successMessage = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.errorMessage = null;
      state.successMessage = 'Account created successfully!';
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
      state.successMessage = null;
    },
    clearMessages: (state) => {
      state.errorMessage = null;
      state.successMessage = null;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
  clearMessages
} = authSlice.actions;

export default authSlice.reducer; 