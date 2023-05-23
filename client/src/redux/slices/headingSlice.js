import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const headingSlice = createSlice({
  name: 'heading',
  initialState,
  reducers: {
    setHeading: (state, action) => {
       state.value = action.payload
    }
  
  },
})

// Action creators are generated for each case reducer function
export const { setHeading } = headingSlice.actions

export default headingSlice.reducer