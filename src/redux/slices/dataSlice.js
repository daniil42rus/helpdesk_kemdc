import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	applications: [],
	executors: [],
	customers: [],
};

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setApplications: (state, action) => {
			state.applications = action.payload;
		},
		setExecutors: (state, action) => {
			state.executors = action.payload;
		},
		setCustomers: (state, action) => {
			state.customers = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setApplications, setExecutors, setCustomers } =
	dataSlice.actions;

export default dataSlice.reducer;
