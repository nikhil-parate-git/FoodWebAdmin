import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "../auth/loginSlice"; 

// Environment variable ka use karke base path set kiya
const API_URL = `${import.meta.env.VITE_API_URL}/admin/auth/profile`;

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      // 401 → token invalid/expired → force logout
      if (error.response?.status === 401) {
        dispatch(logout());
      }

      const message = error.response?.data?.message || "Failed to fetch profile";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    adminData: null,
    loading:   false,
    error:     null,
  },
  reducers: {
    clearProfile: (state) => {
      state.adminData = null;
      state.error     = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading   = false;
        state.adminData = action.payload.admin;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading   = false;
        state.error     = action.payload;
        state.adminData = null; // ← clear on error
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;