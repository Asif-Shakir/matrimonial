import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
};
const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    show(state) {
      state.show = true;
    },
    hide(state) {
      state.show = false;
    },
  },
});
export const spinnerActions = spinnerSlice.actions;
export default spinnerSlice.reducer;
