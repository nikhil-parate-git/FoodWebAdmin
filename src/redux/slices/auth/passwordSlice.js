import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Environment variable ka use karke base path set kiya
const BASE = `${import.meta.env.VITE_API_URL}/admin/auth`;

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const forgotPassword = createAsyncThunk(
  "password/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE}/forgot-password`, { email });

      // Show OTP in toast for 10 seconds (only in development mode)
      if (data.developmentMode && data.otp) {
        toast.info(`Your OTP is: ${data.otp}`, { autoClose: 10000 });
      }

      toast.success(data.message || "OTP sent to your email!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send OTP";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "password/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE}/verify-otp`, { email, otp });
      toast.success(data.message || "OTP verified successfully!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid OTP";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async ({ newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${BASE}/reset-password`,
        { newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(data.message || "Password reset successfully!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to reset password";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    email: "",
    loading: false,
    error: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // forgotPassword
      .addCase(forgotPassword.pending, pending)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, rejected)
      // verifyOtp
      .addCase(verifyOtp.pending, pending)
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, rejected)
      // resetPassword
      .addCase(resetPassword.pending, pending)
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, rejected);
  },
});

export const { setEmail, clearError } = passwordSlice.actions;
export default passwordSlice.reducer;