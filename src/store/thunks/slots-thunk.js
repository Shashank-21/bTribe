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
  async ({ slotId, token, purpose }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot/${slotId}`,
      { purpose },
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
  async ({ slotId, token, purpose }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot-waitlist/${slotId}`,
      { purpose },
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
  async ({ slotId, token, mentorCancellationReason }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/cancel-slot-mentor/${slotId}`,
      { mentorCancellationReason },
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

export const updateSlotStatus = createAsyncThunk(
  "slots/update-status",
  async ({ slotId, status, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/update-slot-status/${slotId}`,
      { status },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);
export const overrideSlotStatus = createAsyncThunk(
  "slots/overroide-status",
  async ({ slotId, status, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/override-slot-status/${slotId}`,
      { status },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const updatePastSlotsStudent = createAsyncThunk(
  "slots/update-students-past-slots",
  async ({ student, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/update-student-slots`,
      { student },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);
export const updatePastSlotsMentor = createAsyncThunk(
  "slots/update-mentor-past-slots",
  async ({ mentor, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/update-mentor-slots`,
      { mentor },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const cancelSlotBookingStudent = createAsyncThunk(
  "slots/cancel-booking-student",
  async ({ slotId, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/cancel-slot-student`,
      { slotId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const handleFeedback = createAsyncThunk(
  "slots/feedback",
  async ({ slotId, token, rating, subjectiveFeedback }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot-feedback/${slotId}`,
      { rating, subjectiveFeedback },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const handleFeedbackApproval = createAsyncThunk(
  "slots/feedback-approval",
  async ({ slotId, token, mentorFeedbackVerdict, studentFeedbackVerdict }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/slot-feedback-approval/${slotId}`,
      { mentorFeedbackVerdict, studentFeedbackVerdict },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const slotRefundRequestHandler = createAsyncThunk(
  "slots/refund-request",
  async ({ slotId, token, studentRefundReason }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/request-slot-refund/${slotId}`,
      { studentRefundReason },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);
export const slotRefundRequestApprovalHandler = createAsyncThunk(
  "slots/refund-request-approval",
  async ({ slotId, token, status }) => {
    const response = await axios.put(
      `${
        import.meta.env.VITE_AXIOS_BASE_URL
      }/request-slot-refund-approval/${slotId}`,
      { status },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
);

export const dropOffWaitList = createAsyncThunk(
  "slots/drop-off-waitlist",
  async ({ slotId, token }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_AXIOS_BASE_URL}/drop-off-waitlist/${slotId}`,
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
