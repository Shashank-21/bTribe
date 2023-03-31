import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourses = createAsyncThunk("courses/fetch", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_AXIOS_BASE_URL}/courses`
  );
  return response.data;
});
export const fetchOneCourse = createAsyncThunk(
  "courses/fetch-one",
  async (slug) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/course/${slug}`
    );
    console.log(response);
    return response.data;
  }
);
