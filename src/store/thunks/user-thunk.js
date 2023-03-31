import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoogleUser = createAsyncThunk(
  "users/google",
  async ({ role, access_token }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/fetch-${role}-data`,
      { params: { access_token } }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (email, password) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  }
);

export const registerUser = createAsyncThunk("users/register", async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_AXIOS_BASE_URL}/register`,
    data
  );
  return response.data;
});

export const updateUser = createAsyncThunk("users/update", async (data) => {
  const response = await axios.put(
    `${import.meta.env.VITE_AXIOS_BASE_URL}/${data._id}`,
    data
  );
  return response.data;
});

export const deleteUser = createAsyncThunk("users/delete", async (userId) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_AXIOS_BASE_URL}/users/${userId}`
  );
  return response.data;
});

export const authCheck = createAsyncThunk(
  "users/auth-check",
  async ({ userId, token }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/auth-check`,
      {
        headers: {
          Authorization: token,
        },
        body: {
          userId,
        },
      }
    );
    return response.data;
  }
);

export const listMentors = createAsyncThunk(
  "users/mentor/list",
  async (token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/api/mentors`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);
