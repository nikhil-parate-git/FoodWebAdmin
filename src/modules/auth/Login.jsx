import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../redux/slices/auth/loginSlice";
import loginImg from "../../assets/auth/login.svg";
import logo from "../../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginAdmin({ email, password }));

    // Agar login success hota hai toh navigate karein
    if (result.meta.requestStatus === "fulfilled") {
      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center gap-1">
      <div className="flex flex-1 items-center justify-center gap-5 max-w-7xl w-full ">
        <div>
          <div className="flex items-center gap-2 mb-2 justify-center">
            <img src={logo} alt="Local Trade Street" />
          </div>

          <div className="bg-white rounded-md shadow-md shadow-[#E8431A]/20 border border-orange-600/50 p-8 w-100 flex-shrink-0">
            <h1 className="text-5xl font-bold text-[#E8431A] text-center mb-3">
              Log in
            </h1>

            <p className="text-md text-gray-500 text-center mb-6 leading-relaxed">
              Log in to access your Super Admin dashboard and manage vendors,
              monitor listings, and control platform performance.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
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
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-[#E8431A] focus:ring-1 focus:ring-[#E8431A]/30 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:border-[#E8431A] focus:ring-1 focus:ring-[#E8431A]/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-3.5 h-3.5 accent-[#E8431A]"
                  />
                  <span className="text-xs text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  title="Forgot Password"
                  className="text-xs text-[#E8431A] hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E8431A] hover:bg-[#d03b15] active:scale-[0.98] text-white font-semibold py-3 rounded-lg transition-all text-sm mt-1 flex items-center justify-center gap-2"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          </div>
        </div>

        <div className=" flex items-center justify-center">
          <img src={loginImg} alt="Login illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
