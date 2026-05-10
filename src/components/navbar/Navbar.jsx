import React from "react";
import { Bell, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ─── Sub-components ────────────────────────────────────────────────────────────

// Notification Icon with Badge
const NotificationBell = () => (
  <div className="relative cursor-pointer group">
    <Bell
      className="text-orange-100 group-hover:text-white w-7 h-7 transition-colors"
      strokeWidth={1.8}
    />
    <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-white border-2 border-[#E8431A] rounded-full" />
  </div>
);

// Dynamic Avatar (Picks first letter of Name)
const UserAvatar = ({ name, onClick }) => (
  <div
    onClick={onClick}
    className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/40 bg-orange-800 flex-shrink-0 cursor-pointer hover:border-white transition-all shadow-sm"
  >
    <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
      {name ? name.charAt(0).toUpperCase() : "A"}
    </div>
  </div>
);

// User Text Details
const UserInfo = ({ name, onClick }) => (
  <div
    onClick={onClick}
    className="hidden sm:flex items-center gap-2 cursor-pointer group"
  >
    <div className="flex flex-col leading-tight items-end">
      <span className="text-white text-sm font-bold tracking-wide group-hover:text-orange-100 transition-colors">
        {name || "Admin User"}
      </span>
    </div>
    <ChevronDown
      className="text-white/80 w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
      strokeWidth={2}
    />
  </div>
);

// ─── Main Navbar Component ──────────────────────────────────────────────────────
const Navbar = () => {
  const navigate = useNavigate();

  // ✅ authSlice se admin lo — login ke baad instantly available hota hai
  // profileSlice ka fetchProfile API call ka wait nahi karna padega
  const admin = useSelector((state) => state.auth.admin);

  // Fallback: agar Redux mein nahi hai toh localStorage se lo
  const adminName = admin?.name || JSON.parse(localStorage.getItem("admin"))?.name;

  return (
    <header className="w-full bg-[#E8431A] px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
      {/* Left Section: Dynamic Welcome Message */}
      <div className="flex flex-col leading-tight">
        <span className="text-orange-200 text-[15px] font-bold  opacity-80">
          Welcome Back
        </span>
        <h2 className="text-white text-lg font-extrabold tracking-tight">
          {adminName ? adminName.split(" ")[0] : "Admin"} 
        </h2>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <NotificationBell />

        {/* Divider */}
        <div className="h-8 w-[1px] bg-white/20 mx-1 hidden sm:block"></div>

        {/* Profile Group */}
        <div className="flex items-center gap-3">
          <UserInfo
            name={adminName}
            onClick={() => navigate("/profile")}
          />
          <UserAvatar
            name={adminName}
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;