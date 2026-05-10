import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://foodwebbe.onrender.com/api/admin/auth/login";

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, credentials);
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