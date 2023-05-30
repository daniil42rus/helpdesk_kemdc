import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import headingSlice from './slices/headingSlice';
import dataSlice from './slices/dataSlice';
import filtersSlice from './slices/filtersSlice';
import authSlice from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    heading: headingSlice,
    data: dataSlice,
    filters: filtersSlice,
    auth: authSlice,
  },
});
