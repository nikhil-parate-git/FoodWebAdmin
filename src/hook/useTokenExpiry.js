import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/auth/loginSlice";
import { toast } from "react-toastify";

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const useTokenExpiry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      dispatch(logout());
      navigate("/login", { replace: true });
      toast.error("Session expired. Please login again.");
      return;
    }

    const payload       = JSON.parse(atob(token.split(".")[1]));
    const msUntilExpiry = payload.exp * 1000 - Date.now();

    const timer = setTimeout(() => {
      dispatch(logout());
      navigate("/login", { replace: true });
      toast.error("Session expired. Please login again.");
    }, msUntilExpiry);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);
};

export default useTokenExpiry;