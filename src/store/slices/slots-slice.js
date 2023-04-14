import { createSlice } from "@reduxjs/toolkit";
import {
  createSlot,
  listMentorSlots,
  listStudentSlots,
  bookSlot,
  joinSlotWaitlist,
  deleteSlot,
  listAllSlots,
  updateSlotStatus,
  overrideSlotStatus,
  updatePastSlotsStudent,
  updatePastSlotsMentor,
  cancelSlotBookingStudent,
  handleFeedback,
  handleFeedbackApproval,
  slotRefundRequestHandler,
  slotRefundRequestApprovalHandler,
  dropOffWaitList,
} from "../thunks/slots-thunk";

const slotsSlice = createSlice({
  name: "slots",
  initialState: {
    allSlots: null,
    waitListAllowed: 2,
    mentorSlots: null,
    studentSlots: null,
    error: null,
    loading: false,
    slotCreated: null,
    slotDeleted: null,
    slotUpdated: null,
    rating: 0,
  },
  reducers: {
    changeRating(state, action) {
      state.rating = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createSlot.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.slotCreated = action.payload;
      })
      .addCase(createSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(listMentorSlots.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listMentorSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.mentorSlots = action.payload;
      })
      .addCase(listMentorSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(listStudentSlots.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listStudentSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.studentSlots = action.payload;
      })
      .addCase(listStudentSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(bookSlot.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(joinSlotWaitlist.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(joinSlotWaitlist.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(joinSlotWaitlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteSlot.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.slotDeleted = action.payload;
      })
      .addCase(deleteSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(listAllSlots.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listAllSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.allSlots = action.payload;
      })
      .addCase(listAllSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateSlotStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateSlotStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(updateSlotStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(overrideSlotStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(overrideSlotStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(overrideSlotStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updatePastSlotsStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePastSlotsStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.pastUpdateStatus = action.payload.updated;
      })
      .addCase(updatePastSlotsStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updatePastSlotsMentor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePastSlotsMentor.fulfilled, (state, action) => {
        state.loading = false;
        state.pastUpdateStatus = action.payload.updated;
      })
      .addCase(updatePastSlotsMentor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(cancelSlotBookingStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cancelSlotBookingStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(cancelSlotBookingStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(handleFeedback.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(handleFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(handleFeedbackApproval.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleFeedbackApproval.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(handleFeedbackApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(slotRefundRequestHandler.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(slotRefundRequestHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(slotRefundRequestHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(slotRefundRequestApprovalHandler.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(slotRefundRequestApprovalHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(slotRefundRequestApprovalHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(dropOffWaitList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(dropOffWaitList.fulfilled, (state, action) => {
        state.loading = false;
        state.slotUpdated = action.payload;
      })
      .addCase(dropOffWaitList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { changeRating } = slotsSlice.actions;
export const slotsReducer = slotsSlice.reducer;
