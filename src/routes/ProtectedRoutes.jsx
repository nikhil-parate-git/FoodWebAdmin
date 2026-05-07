import { Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../modules/dashboard/Dashboard";
import Customer from "../modules/customerManagement/Customer";
import Orders from "../modules/orderManagement/Orders";
import Dishes from "../modules/dishesManagement/Dishes";
import RevenueManagement from "../modules/revenueManagement/RevenueManagement";
import BannerManagement from "../modules/bannerManagement/BannerManagement";
import CustomerView from "../modules/customerManagement/CustomerView";
import OrderView from "../modules/orderManagement/OrderView";
import CategoryList from "../modules/categoryManagement/Category";
import AddCategory from "../modules/categoryManagement/AddCategory";
import ViewCategory from "../modules/categoryManagement/ViewCategory";
import UpdateCategory from "../modules/categoryManagement/UpdateCategory";
import AddDishes from "../modules/dishesManagement/AddDishes";
import ViewDishes from "../modules/dishesManagement/ViewDishes";
import UpdateDishes from "../modules/dishesManagement/UpdateDishes";
import AddBanner from "../modules/bannerManagement/AddBanner";
import UpdateBanner from "../modules/bannerManagement/UpdateBanner";
import ViewBanner from "../modules/bannerManagement/ViewBanner";
const ProtectedRoutes = () => {
  return [
    <Route key="main" path="/" element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/customer/:id" element={<CustomerView />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderView />} />
      <Route path="/category" element={<CategoryList />} />
      <Route path="/categories/add" element={<AddCategory />} />
      <Route path="/categories/update/:id" element={<UpdateCategory />} />
      <Route path="/categories/view/:id" element={<ViewCategory />} />
      <Route path="/dishes" element={<Dishes />} />
      <Route path="/dishes/add" element={<AddDishes />} />
      <Route path="/dishes/view/:id" element={<ViewDishes />} />
      <Route path="/dishes/update/:id" element={<UpdateDishes />} />
      <Route path="/revenue" element={<RevenueManagement />} />
      <Route path="/banner" element={<BannerManagement />} />
      <Route path="/banner/add" element={<AddBanner />} />
      <Route path="/banner/update/:id" element={<UpdateBanner />} />

      <Route path="/banner/view/:id" element={<ViewBanner />} />
    </Route>,
  ];
};

export default ProtectedRoutes;
