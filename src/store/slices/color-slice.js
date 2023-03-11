import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    headerBgColor: "bg-stone-800",
    footerBgColor: "bg-stone-800",
    cardBgColor: "bg-stone-200",
    cardHeadingBgColor: "bg-yellow-400",
    borderColor: "border-stone-300",
    formBgColor: "bg-stone-200",
    optionBgColor: "bg-stone-200",
    optionBgColorSelected: "bg-yellow-400",
    linkBgColorSelected: "bg-stone-700",
    textColor: "text-stone-700",
    headingColor: "text-stone-900",
    navTextColor: "text-stone-100",
    footerTextColor: "text-stone-100",
    navActiveColor: "text-yellow-300",
    navActiveBorderColor: "border-yellow-300",
    dashboardCardBgColor: "bg-yellow-400",
  },
  reducers: {
    changeColor(state, action) {
      return action.payload;
    },
  },
});

export const { changeColor } = colorSlice.actions;
export const colorReducer = colorSlice.reducer;
