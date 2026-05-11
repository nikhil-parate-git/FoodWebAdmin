import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Environment variable ka upyog karke base path set kiya
const BASE_URL = `${import.meta.env.VITE_API_URL}/admin`;

const getToken = () => localStorage.getItem("token");

// ─── THUNK: Create Dish ─────────────────────────────────────────────────────
export const createDish = createAsyncThunk(
  "dishes/createDish",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${BASE_URL}/dishes/createdish`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message || "Dish created successfully! 🍽️");
      return response.data.dish;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Error creating dish";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ─── THUNK: Fetch All Dishes ─────────────────────────────────────────────────
export const fetchDishes = createAsyncThunk(
  "dishes/fetchDishes",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/dishes/getall`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.dishes;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to load dishes";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ─── THUNK: Fetch Single Dish ────────────────────────────────────────────────
export const fetchDishById = createAsyncThunk(
  "dishes/fetchDishById",
  async (dishId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/dishes/${dishId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.dish;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to load dish";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ─── THUNK: Delete Dish ──────────────────────────────────────────────────────
export const deleteDish = createAsyncThunk(
  "dishes/deleteDish",
  async (dishId, { rejectWithValue }) => {
    try {
      const token = getToken();
      await axios.delete(`${BASE_URL}/dishes/delete/${dishId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Dish deleted successfully!");
      return dishId;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Error deleting dish";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ─── THUNK: Update Dish ──────────────────────────────────────────────────────
export const updateDish = createAsyncThunk(
  "dishes/updateDish",
  async ({ dishId, formData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${BASE_URL}/dishes/update/${dishId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Dish updated successfully! ✅");
      return response.data.dish;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Error updating dish";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ─── THUNK: Fetch Categories Dropdown ───────────────────────────────────────
export const fetchCategoriesDropdown = createAsyncThunk(
  "dishes/fetchCategoriesDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/categories/dropdown`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      // ── Extract raw array from any API response shape ──
      let raw = [];
      if (Array.isArray(data)) {
        raw = data;
      } else if (data.categories && Array.isArray(data.categories)) {
        raw = data.categories;
      } else if (data.data && Array.isArray(data.data)) {
        raw = data.data;
      } else {
        raw = Object.values(data).find((v) => Array.isArray(v)) || [];
      }

      // ── Normalize: API sends { value, label } — map to { _id, name } ──
      return raw.map((cat) => ({
        _id: cat._id || cat.value,
        name: cat.name || cat.label,
      }));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load categories";
      return rejectWithValue(message);
    }
  }
);

// ─── SLICE ───────────────────────────────────────────────────────────────────
const dishSlice = createSlice({
  name: "dishes",
  initialState: {
    dishes: [],
    selectedDish: null,
    categories: [],
    loading: false,
    categoryLoading: false,
    error: null,
    createSuccess: false,
    updateSuccess: false,
  },
  reducers: {
    resetCreateSuccess(state) {
      state.createSuccess = false;
    },
    resetUpdateSuccess(state) {
      state.updateSuccess = false;
    },
    setSelectedDish(state, action) {
      state.selectedDish = action.payload;
    },
    clearSelectedDish(state) {
      state.selectedDish = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDish.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createDish.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        state.dishes.unshift(action.payload);
      })
      .addCase(createDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.createSuccess = false;
      });

    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchDishById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedDish = null;
      })
      .addCase(fetchDishById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDish = action.payload;
      })
      .addCase(fetchDishById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteDish.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = state.dishes.filter((d) => d._id !== action.payload);
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateDish.pending, (state) => {
        state.loading = true;
        state.updateSuccess = false;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;
        const index = state.dishes.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) state.dishes[index] = action.payload;
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      });

    builder
      .addCase(fetchCategoriesDropdown.pending, (state) => {
        state.categoryLoading = true;
      })
      .addCase(fetchCategoriesDropdown.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesDropdown.rejected, (state) => {
        state.categoryLoading = false;
      });
  },
});

export const {
  resetCreateSuccess,
  resetUpdateSuccess,
  setSelectedDish,
  clearSelectedDish,
  clearError,
} = dishSlice.actions;

export default dishSlice.reducer;