import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: 0,
};

export const selectAppSlice = createSlice({
  name: 'selectApp',
  initialState,
  reducers: {
    setSelectApplications: (state, action) => {
      state.applications = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectApplications } = selectAppSlice.actions;

export default selectAppSlice.reducer;
