import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createSlot = createAsyncThunk(
  "slots/create",
  async ({ date, time, token }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot`,
      {
        date,
        time,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const listMentorSlots = createAsyncThunk(
  "slots/list/mentor",
  async ({ mentorId, token }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slots/${mentorId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);
export const listStudentSlots = createAsyncThunk(
  "slots/list/students",
  async ({ studentId, token }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slots/${studentId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const bookSlot = createAsyncThunk(
  "slots/book",
  async ({ slotId, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot/${slotId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);
export const joinSlotWaitlist = createAsyncThunk(
  "slots/join-waitlist",
  async ({ slotId, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot-waitlist/${slotId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const deleteSlot = createAsyncThunk(
  "slots/delete",
  async ({ slotId, token }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot/${slotId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const listAllSlots = createAsyncThunk(
  "slots/list-all",
  async (token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slots`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);
