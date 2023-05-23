import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import headingSlice from './slices/headingSlice';
import dataSlice from './slices/dataSlice';
import filtersSlice from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    heading: headingSlice,
    data: dataSlice,
    filters: filtersSlice,
  },
});
