import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import headingSlice from './slices/headingSlice';
import dataSlice from './slices/dataSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		heading: headingSlice,
		data: dataSlice,
	},
});
