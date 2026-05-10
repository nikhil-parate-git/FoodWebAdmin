import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://foodwebbe.onrender.com/api/admin/orders";

// Fetch All Orders
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async ({ page = 1, status = "", search = "" }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/all`, {
        params: { page, status, search },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch orders";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

// Fetch Single Order By ID (New)
export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.order;
    } catch (error) {
      const message = error.response?.data?.message || "Order not found";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Order status updated!");
      return { id, status };
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    selectedOrder: null, // Single order state
    pagination: {},
    loading: false,
    updateLoading: false,
    error: null,
  },
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Order (New)
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.loading = false;
      })
      // Update Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateLoading = false;
        const { id, status } = action.payload;
        if (state.selectedOrder?._id === id) {
          state.selectedOrder.status = status;
        }
        const order = state.orders.find((o) => o._id === id);
        if (order) order.status = status;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.updateLoading = false;
      });
  },
});

export const { clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
