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
  async ({ email, password }) => {
    const response = await axios.post(
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
    `${import.meta.env.VITE_AXIOS_BASE_URL}/user/${data._id}`,
    data
  );
  console.log(response.data);
  return response.data;
});

export const deleteUser = createAsyncThunk(
  "users/delete",
  async ({ userId, token }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/user/${userId}`,
      { headers: { Authorization: token } }
    );
    return response.data;
  }
);

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

export const mentorApprovalCheck = createAsyncThunk(
  "users/mentor-approval-check",
  async ({ userId, token }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/mentor-approval-check`,
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

export const adminApprovalCheck = createAsyncThunk(
  "users/admin-approval-check",
  async ({ userId, token }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/admin-approval-check`,
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
      `${import.meta.env.VITE_AXIOS_BASE_URL}/mentors`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const listPendingApprovalUsers = createAsyncThunk(
  "users/pending-approvals",
  async (token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/pending-approvals`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const approveUserRole = createAsyncThunk(
  "users/approve-role",
  async ({ userId, token, mentoredCourses }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/approve/${userId}`,
      { mentoredCourses: mentoredCourses || null },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  "user/create-order",
  async (amount) => {
    const response = await axios.post(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/create-order`,
      { amount }
    );
    return response.data;
  }
);

export const verifyPaymentSignature = createAsyncThunk(
  "user/verify-signature",
  async ({ razorpayResponse, name, email }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/verify-signature`,
      { razorpayResponse, name, email }
    );
    return response.data;
  }
);

export const resetPasswordRequest = createAsyncThunk(
  "user/reset-password-request",
  async (email) => {
    const response = await axios.post(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/reset-password-request`,
      { email }
    );
    return response.data;
  }
);
export const resetPasswordVerify = createAsyncThunk(
  "user/reset-password-verify",
  async (token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/reset-password-verify`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async ({ email, password }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/reset-password`,
      {
        email,
        password,
      }
    );
    return response.data;
  }
);
