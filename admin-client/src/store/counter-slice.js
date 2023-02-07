import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  show: true,
};
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    increaseBy(state, action) {
      state.count = state.count + action.payload;
    },
    toggle(state) {
      state.show = !state.show;
    },
  },
});
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
