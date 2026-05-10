import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import useTokenExpiry from "../hook/useTokenExpiry";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useTokenExpiry();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;