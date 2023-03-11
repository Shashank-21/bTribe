import { configureStore } from "@reduxjs/toolkit";
import { colorReducer } from "./slices/color-slice";
import { coursesReducer } from "./slices/courses-slice";
import { studentsReducer } from "./slices/students-slice";
import { userReducer } from "./slices/user-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    color: colorReducer,
    courses: coursesReducer,
    students: studentsReducer,
  },
});

export * from "./slices/user-slice";
export * from "./slices/color-slice";
export * from "./slices/courses-slice";
export * from "./slices/students-slice";
