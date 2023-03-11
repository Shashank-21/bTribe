import { createSlice } from "@reduxjs/toolkit";

const studentsSlice = createSlice({
  name: "students",
  initialState: [
    {
      id: "eiqohe12313",
      name: "Shashank B R",
      role: "student",
      coursesEnrolled: [{ courseId: "Zsbizbd-1yDKPghnFf0r7", variantIndex: 0 }],
      remainingSlots: [10],
      certificates: [],
    },
  ],
  reducers: {
    addStudent(state, action) {
      state.push(action.payload);
    },
    removestudent(state, action) {
      state = state.filter((student) => {
        student.id !== action.payload;
      });
    },
    updateStudent(state, action) {
      state = state.map((student) => {
        if (student.id === action.payload.id) {
          return action.payload;
        }
        return student;
      });
    },
  },
});

export const { addStudent, removestudent, updateStudent } =
  studentsSlice.actions;
export const studentsReducer = studentsSlice.reducer;
