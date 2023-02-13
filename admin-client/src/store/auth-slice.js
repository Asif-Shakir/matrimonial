import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpService from "../shared/http/httpService";

const initialState = {
  loading: false,
  userInfo: {},
  error: "",
};
export const loginThunk = createAsyncThunk("auth/login", async (data) => {
  const { url, email, password } = data;
  debugger;
  const response = await httpService.post(url, { email, password });
  if (response.data.resultData.email) {
    localStorage.setItem(
      "_authState",
      JSON.stringify(response.data.resultData)
    );
  }
  return response.data.resultData;
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = "";
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.userInfo = {};
      state.error = action.error.message;
    });
  },
});
export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
