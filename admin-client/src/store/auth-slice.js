import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});
export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
