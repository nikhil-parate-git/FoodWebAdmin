import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Environment variable ka upyog karke path set kiya
const BASE_URL = `${import.meta.env.VITE_API_URL}/admin/categories`;

// ─────────────────────────── THUNKS ───────────────────────────

// GET single category by ID
export const fetchCategoryById = createAsyncThunk(
  "viewcategory/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data.category;
    } catch (err) {
      const msg = err.response?.data?.message || "Category fetch karne mein error aaya";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// PUT update category by ID
export const updateCategory = createAsyncThunk(
  "viewcategory/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/update/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(res.data.message || "Category update ho gayi!");
      return res.data.category;
    } catch (err) {
      const msg = err.response?.data?.message || "Category update karne mein error aaya";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// ─────────────────────────── SLICE ───────────────────────────

const viewCategorySlice = createSlice({
  name: "viewcategory",
  initialState: {
    selectedCategory: null,
    detailLoading: false,
    detailError: null,
    actionLoading: false,
    actionError: null,
  },
  reducers: {
    clearSelectedCategory(state) {
      state.selectedCategory = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchCategoryById ──
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
        state.selectedCategory = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
      });

    // ── updateCategory ──
    builder
      .addCase(updateCategory.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const { clearSelectedCategory } = viewCategorySlice.actions;
export default viewCategorySlice.reducer;