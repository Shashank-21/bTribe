import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
  },
  reducers: {
    changeUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { changeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
