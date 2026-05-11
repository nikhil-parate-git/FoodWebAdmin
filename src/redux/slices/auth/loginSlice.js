import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Base URL ko environment variable se fetch kiya gaya hai
const BASE_URL = import.meta.env.VITE_API_URL;
const LOGIN_ENDPOINT = `${BASE_URL}/admin/auth/login`;

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      // API_URL ki jagah LOGIN_ENDPOINT use kiya
      const response = await axios.post(LOGIN_ENDPOINT, credentials);
      
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        toast.success(response.data.message || "Logged in successfully!");
        return response.data;
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin:           JSON.parse(localStorage.getItem("admin")) || null,
    token:           localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading:         false,
    error:           null,
  },
  reducers: {
    logout: (state) => {
      state.admin           = null;
      state.token           = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      toast.info("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading         = false;
        state.admin           = action.payload.admin;
        state.token           = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading         = false;
        state.error           = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;