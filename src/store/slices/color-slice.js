import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    headerBgColor: "bg-stone-800",
    footerBgColor: "bg-stone-800",
    cardBgColor: "bg-stone-200",
    cardHeadingBgColor: "bg-yellow-400",
    timeBgColor: "bg-yellow-400",
    timeTextColor: "text-stone-800",
    borderColor: "border-stone-300",
    formBgColor: "bg-stone-200",
    formPlaceholderColor: "text-stone-400",
    optionBgColor: "bg-stone-200",
    optionBgColorSelected: "bg-yellow-400",
    linkBgColorSelected: "bg-stone-700",
    textColor: "text-stone-700",
    headingColor: "text-stone-900",
    navTextColor: "text-stone-100",
    footerTextColor: "text-stone-100",
    navActiveColor: "text-yellow-300",
    navActiveBorderColor: "border-yellow-300",
    dashboardCardBgColor: "bg-stone-300",
    dashboardBgColor: "bg-stone-200",
    dashboardTabBgColor: "bg-stone-300",
    dashboardTabBgColorSelected: "bg-stone-200",
    dashboardTitleBgColor: "bg-stone-300",
    dashboardBorderColor: "border-stone-300",
    mentorSlotCardBgColor: "bg-stone-200",
    dropdownBgColor: "bg-stone-50",
    dropdownBgColorSelected: "bg-stone-200",
  },
  reducers: {
    changeColor(state, action) {
      return action.payload;
    },
  },
});

export const { changeColor } = colorSlice.actions;
export const colorReducer = colorSlice.reducer;
