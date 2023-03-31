import { createSlice } from "@reduxjs/toolkit";
import {
  createSlot,
  listMentorSlots,
  listStudentSlots,
  bookSlot,
  joinSlotWaitlist,
  deleteSlot,
  listAllSlots,
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
      });
  },
});

export const slotsReducer = slotsSlice.reducer;
