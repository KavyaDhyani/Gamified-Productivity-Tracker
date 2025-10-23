import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import sessionReducer from '../features/sessionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
  },
});
