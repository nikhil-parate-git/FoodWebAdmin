import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://foodwebbe.onrender.com/api/admin/banners";

const getToken = () => localStorage.getItem("token");
const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchAllBanners = createAsyncThunk(
  "banner/fetchAll",
  async ({ page = 1, search = "" } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      if (search) params.append("search", search);

      const res = await axios.get(`${BASE_URL}/all?${params.toString()}`, authHeaders());
      // Return both banners and pagination
      return {
        banners: res.data.banners,
        pagination: res.data.pagination,
      };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch banners";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const fetchBannerById = createAsyncThunk(
  "banner/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`, authHeaders());
      return res.data.banner;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch banner";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const addBanner = createAsyncThunk(
  "banner/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/add`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Banner added successfully!");
      return res.data.banner;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add banner";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const updateBanner = createAsyncThunk(
  "banner/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Banner updated successfully!");
      return res.data.banner;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update banner";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, authHeaders());
      toast.success("Banner deleted successfully!");
      return id;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete banner";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: [],
    pagination: null,       // ← NEW
    selectedBanner: null,
    loading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearSelectedBanner: (state) => {
      state.selectedBanner = null;
    },
  },
  extraReducers: (builder) => {
    // fetchAll
    builder
      .addCase(fetchAllBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.banners;
        state.pagination = action.payload.pagination; // ← NEW
      })
      .addCase(fetchAllBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchById
    builder
      .addCase(fetchBannerById.pending, (state) => {
        state.loading = true;
        state.selectedBanner = null;
        state.error = null;
      })
      .addCase(fetchBannerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBanner = action.payload;
      })
      .addCase(fetchBannerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // add
    builder
      .addCase(addBanner.pending, (state) => { state.actionLoading = true; })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.banners.unshift(action.payload);
      })
      .addCase(addBanner.rejected, (state) => { state.actionLoading = false; });

    // update
    builder
      .addCase(updateBanner.pending, (state) => { state.actionLoading = true; })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.selectedBanner = action.payload;
        const idx = state.banners.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) state.banners[idx] = action.payload;
      })
      .addCase(updateBanner.rejected, (state) => { state.actionLoading = false; });

    // delete
    builder
      .addCase(deleteBanner.pending, (state) => { state.actionLoading = true; })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.banners = state.banners.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBanner.rejected, (state) => { state.actionLoading = false; });
  },
});

export const { clearSelectedBanner } = bannerSlice.actions;
export default bannerSlice.reducer;