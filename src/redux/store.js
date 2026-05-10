import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/auth/loginSlice";
import profileReducer from "../redux/slices/profile/profileSlice";
import passwordReducer from "../redux/slices/auth/passwordSlice";
import userReducer from "../redux/slices/customer/customerSlice";
import customerDetailsReducer from "../redux/slices/customer/detailsSlice";
import orderReducer from "../redux/slices/orders/orderSlice";
import categoryReducer from "../redux/slices/category/addCategorySlice";
import getcategoryReducer from "../redux/slices/category/getCategorySlice";
import viewCategoryReducer from "../redux/slices/category/viewCategorySlice";
import dishReducer from "../redux/slices/dishes/dishSlice";
import bannerReducer from "../redux/slices/banner/bannerSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    password: passwordReducer,
    users: userReducer,
    customerDetails: customerDetailsReducer,
    orders: orderReducer,
    category: categoryReducer,
    getcategory: getcategoryReducer,
    viewcategory: viewCategoryReducer,
    dishes: dishReducer,
    banner: bannerReducer,
  },
});
