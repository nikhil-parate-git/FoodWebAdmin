// import { Route } from "react-router-dom";

// import Login from "../modules/auth/Login";
// import ForgetPassword from "../modules/auth/ForgetPassword";
// import EnterOtp from "../modules/auth/EnterOTP";
// import ResetPassword from "../modules/auth/ResetPassword";
// import PasswordResetSuccess from "../modules/auth/PasswordResetSuccess";

// const PublicRoutes = () => {
//   return [
//     <Route key="login" path="/login" element={<Login />} />,
//     <Route key="forgetPassword" path="/forgot-password" element={<ForgetPassword />} />,
//     <Route key="enterotp" path="/otp" element={<EnterOtp />} />,
//     <Route key="resetPassword" path="/reset-password" element={<ResetPassword />} />,
//     <Route key="passwordSuccess" path="/password-reset-success" element={<PasswordResetSuccess />} />,
//   ];
// };

// export default PublicRoutes;

import { Route } from "react-router-dom";
import PublicRoute from "../routes/PublicRoute";
import Login                from "../modules/auth/Login";
import ForgetPassword       from "../modules/auth/ForgetPassword";
import EnterOtp             from "../modules/auth/EnterOTP";
import ResetPassword        from "../modules/auth/ResetPassword";
import PasswordResetSuccess from "../modules/auth/PasswordResetSuccess";

const PublicRoutes = () => {
  return [
    // Login & Forgot — blocked if already logged in
    <Route key="public-guard" element={<PublicRoute />}>
      <Route path="/login"           element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
    </Route>,

    // OTP flow — always accessible (no guard)
    <Route key="enterotp"      path="/otp"                    element={<EnterOtp />} />,
    <Route key="resetPassword" path="/reset-password"         element={<ResetPassword />} />,
    <Route key="passwordSuccess" path="/password-reset-success" element={<PasswordResetSuccess />} />,
  ];
};

export default PublicRoutes;