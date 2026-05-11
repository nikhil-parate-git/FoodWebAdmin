import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Environment variable ka upyog karke base path set kiya
const BASE_URL = `${import.meta.env.VITE_API_URL}/admin/users`;

// Async Thunk for fetching users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (page, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Token from localstorage
      const response = await axios.get(
        `${BASE_URL}/all?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch users";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalUsers: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;