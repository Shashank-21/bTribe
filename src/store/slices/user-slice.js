import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGoogleUser,
  loginUser,
  deleteUser,
  registerUser,
  updateUser,
  authCheck,
  listMentors,
} from "../thunks/user-thunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    error: false,
    loading: false,
    deletedUser: null,
    authenticateUser: false,
    mentors: null,
  },
  reducers: {
    storeDetails(state, action) {
      return { ...state, userDetails: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGoogleUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchGoogleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGoogleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedUser = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(authCheck.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticateUser = action.payload.ok;
      })
      .addCase(authCheck.rejected, (state, action) => {
        state.loading = false;
        state.authenticateUser = false;
        state.error = action.error;
      })
      .addCase(listMentors.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listMentors.fulfilled, (state, action) => {
        state.loading = false;
        state.mentors = action.payload;
      })
      .addCase(listMentors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { storeDetails } = userSlice.actions;
export const userReducer = userSlice.reducer;
