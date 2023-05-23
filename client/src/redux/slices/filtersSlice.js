import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: false,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory } = filtersSlice.actions;

export default filtersSlice.reducer;
