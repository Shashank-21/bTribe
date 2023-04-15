import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGoogleUser,
  loginUser,
  deleteUser,
  registerUser,
  updateUser,
  authCheck,
  listMentors,
  mentorApprovalCheck,
  listPendingApprovalUsers,
  approveUserRole,
  createOrder,
  verifyPaymentSignature,
  resetPasswordRequest,
  resetPasswordVerify,
  resetPassword,
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
    userApprovalsPending: null,
    approvedUser: null,
    createdOrder: null,
    paymentVerified: null,
  },
  reducers: {
    storeUser(state, action) {
      return { ...state, data: action.payload };
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
      })
      .addCase(mentorApprovalCheck.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(mentorApprovalCheck.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticateUser = action.payload.ok;
      })
      .addCase(mentorApprovalCheck.rejected, (state, action) => {
        state.loading = false;
        state.authenticateUser = false;
        state.error = action.error;
      })
      .addCase(listPendingApprovalUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listPendingApprovalUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userApprovalsPending = action.payload;
      })
      .addCase(listPendingApprovalUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(approveUserRole.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(approveUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedUser = action.payload;
      })
      .addCase(approveUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.createdOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(verifyPaymentSignature.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(verifyPaymentSignature.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentVerified = action.payload;
      })
      .addCase(verifyPaymentSignature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(resetPasswordRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPasswordRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.resetRequestStatus = action.payload.email;
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(resetPasswordVerify.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPasswordVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordEmail = action.payload.email;
      })
      .addCase(resetPasswordVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordStatus = action.payload.status;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { storeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
