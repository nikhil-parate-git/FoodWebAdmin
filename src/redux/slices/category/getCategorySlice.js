import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Environment variable ka upyog karke BASE_URL set kiya
const BASE_URL = `${import.meta.env.VITE_API_URL}/admin/categories`;

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// 1. Fetch All
export const fetchCategories = createAsyncThunk(
  "getcategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, getHeaders());
      if (response.data.success) {
        return response.data.categories || [response.data.category];
      }
      return rejectWithValue("Failed to fetch categories");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  },
);

// 2. Toggle Status API
export const toggleCategoryStatus = createAsyncThunk(
  "getcategory/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/${id}/toggle`,
        {},
        getHeaders(),
      );
      if (response.data.success) {
        toast.success(response.data.message);
        return response.data.category;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Toggle failed");
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// 3. Delete API
export const deleteCategory = createAsyncThunk(
  "getcategory/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/${id}`,
        getHeaders(),
      );
      if (response.data.success) {
        toast.success("Category deleted successfully");
        return id;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const getCategorySlice = createSlice({
  name: "getcategory",
  initialState: { categories: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload._id,
        );
        if (index !== -1) state.categories[index] = action.payload;
      })
      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload,
        );
      });
  },
});

export default getCategorySlice.reducer;