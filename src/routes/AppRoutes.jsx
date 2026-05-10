// import { Routes, Route, Navigate } from "react-router-dom";
// import PublicRoutes from "./PublicRoutes";
// import ProtectedRoutes from "./ProtectedRoutes";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {PublicRoutes()}
//       {ProtectedRoutes()}

//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default AppRoutes;


import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PublicRoutes    from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {PublicRoutes()}
      {ProtectedRoutes()}

      {/* Fallback — unknown routes */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;