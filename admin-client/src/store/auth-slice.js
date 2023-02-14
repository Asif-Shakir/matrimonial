import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import httpService from "../shared/http/httpService";
import { spinnerActions } from "./spinnerSlices";

const initialState = {
  loading: false,
  userInfo: {},
  error: "",
  status: null,
};
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    const { url, email, password } = data;
    thunkApi.dispatch(spinnerActions.show());
    const response = await httpService.post(url, { email, password });
    thunkApi.dispatch(spinnerActions.hide());
    if (response.data?.resultData?.email) {
      localStorage.setItem(
        "_authState",
        JSON.stringify(response.data.resultData)
      );
    }
    return response.data;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = {};
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.resultData;
      state.error = "";
      state.status = action.payload.status;
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
