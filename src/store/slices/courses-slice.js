import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses, fetchOneCourse } from "../thunks/course-thunk";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedVariant: null,
  },
  reducers: {
    changeSelectedVariant(state, action) {
      state.selectedVariant = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCourses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchOneCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchOneCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchOneCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { changeSelectedVariant } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
