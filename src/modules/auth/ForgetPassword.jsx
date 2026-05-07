import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import forgotPassword from "../../assets/auth/forgetpassword.svg";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/otp" );
    toast.success("OTP sent to your email!");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">

      {/* Body */}
      <div className="flex items-center justify-center gap-12 max-w-6xl w-full mx-auto">
        <div className="flex flex-col items-center gap-6 flex-shrink-0">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Local Trade Street" className="w-80" />
          </div>
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-orange-600/20 border border-orange-600/50  p-8 w-100 py-20">
            <h1 className="text-5xl font-bold text-[#E8431A] text-center mb-2 leading-tight">
              Forgot
              <br />
              Password?
            </h1>
            <p className="text-2xl text-gray-700 text-center mb-6 mt-2">
              Enter your registered email address
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600 font-medium">
                  Enter Email Address
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-[#E8431A] focus:ring-1 focus:ring-[#E8431A]/30 transition-colors"
                />
              </div>

              <p className="text-xs text-center text-gray-400">
                Go back to{" "}
                <Link
                  to="/login"
                  className="text-[#E8431A] font-medium hover:underline"
                >
                  Login
                </Link>
              </p>

              <button
                type="submit"
                className="w-full bg-[#E8431A] hover:bg-[#d03b15] active:scale-[0.98] text-white font-semibold py-3 rounded-lg transition-all text-sm"
              >
                Get OTP
              </button>
            </form>
          </div>
        </div>

        {/* Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <img
            src={forgotPassword}
            alt="Forgot password illustration"
            className=" w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
