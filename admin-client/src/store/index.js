import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counter-slice';

const store = configureStore({
  reducer: counterSlice,
});
export default store;
