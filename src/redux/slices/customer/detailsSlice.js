import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Environment variable ka upyog karke base path set kiya
const BASE_URL = `${import.meta.env.VITE_API_URL}/admin/users`;

// Thunk to fetch single user details
export const getCustomerDetails = createAsyncThunk(
  "customer/getDetails",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Token from localstorage
      const response = await axios.get(
        `${BASE_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.user;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const customerDetailsSlice = createSlice({
  name: "customerDetails",
  initialState: {
    customer: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCustomerDetails: (state) => {
      state.customer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
        state.error = null;
      })
      .addCase(getCustomerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCustomerDetails } = customerDetailsSlice.actions;
export default customerDetailsSlice.reducer;