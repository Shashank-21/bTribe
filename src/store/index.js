import { configureStore } from "@reduxjs/toolkit";
import { colorReducer } from "./slices/color-slice";
import { coursesReducer } from "./slices/courses-slice";

import { slotsReducer } from "./slices/slots-slice";

import { userReducer } from "./slices/user-slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    color: colorReducer,
    courses: coursesReducer,

    slots: slotsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

setupListeners(store.dispatch);

export * from "./slices/user-slice";
export * from "./slices/color-slice";
export * from "./slices/courses-slice";
export * from "./slices/slots-slice";
export * from "./thunks/course-thunk";
export * from "./thunks/user-thunk";
export * from "./thunks/slots-thunk";
