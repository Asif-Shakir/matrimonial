import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counter-slice';
import authSlice from './auth-slice';
import spinnerSlices from './spinnerSlices';

const store = configureStore({
  reducer: {
    auth: authSlice,
    counter: counterSlice,
    spinner: spinnerSlices,
  },
});
export default store;
