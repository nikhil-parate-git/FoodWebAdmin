import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  ClipboardList,
  List,
  Tag,
  Layers,
  Image,
  LogOut,
} from "lucide-react";
import logo from "../../assets/logo.png";
import ConfirmModal from "../common/ConfirmModal";
import { logout } from "../../redux/slices/auth/loginSlice";
import { clearProfile } from "../../redux/slices/profile/profileSlice";

// ─── Sidebar Nav Config ────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  {
    id: "enquiry",
    label: "Customer Management",
    icon: ClipboardList,
    path: "/customer",
  },
  { id: "listing", label: "Order Management", icon: List, path: "/orders" },
  {
    id: "category",
    label: "Category Management",
    icon: Tag,
    path: "/category",
  },
  {
    id: "sub-category",
    label: "Dishes Management",
    icon: Layers,
    path: "/dishes",
  },
  { id: "banner", label: "Banner Management", icon: Image, path: "/banner" },
];

const BOTTOM_ITEMS = [
  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
    path: "/login",
    isLogout: true,
  },
];

// ─── Sidebar Logo ──────────────────────────────────────────────────────────────
const SidebarLogo = () => (
  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 flex-shrink-0">
    <img src={logo} alt="" />
  </div>
);

// ─── Nav Item ──────────────────────────────────────────────────────────────────
const NavItem = ({ item }) => {
  const Icon = item.icon;
  const { pathname } = useLocation();

  const isActive =
    item.path === "/"
      ? pathname === "/"
      : pathname === item.path || pathname.startsWith(item.path + "/");

  const baseClass =
    "w-full flex items-center gap-3 px-3 py-2.5 text-left text-md transition-colors duration-150 group";

  const activeClass =
    "bg-[#E23E08] text-white font-semibold border-l-5 border-orange-900";
  const inactiveClass = item.isLogout
    ? "text-gray-800 hover:bg-red-50 hover:text-[#E8431A]"
    : "text-gray-800 font-semibold hover:bg-orange-50 hover:text-[#E8431A]";

  return (
    <li>
      <NavLink
        to={item.path}
        end={false}
        className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      >
        <Icon
          className={`w-4 h-4 flex-shrink-0 transition-colors duration-150 ${
            isActive ? "text-white" : "text-gray-800 group-hover:text-[#E8431A]"
          }`}
          strokeWidth={1.8}
        />
        <span className="truncate">{item.label}</span>
      </NavLink>
    </li>
  );
};

// ─── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearProfile());
    dispatch(logout());
    setShowLogoutModal(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <aside className="w-68 h-screen bg-white border-r border-gray-100 flex flex-col shadow-sm">
        <div className="sticky top-0 z-10 bg-white">
          <SidebarLogo />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Main Nav */}
          <nav className="py-2">
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </ul>
          </nav>

          {/* Bottom Nav */}
          <div className="py-2 border-t border-gray-100">
            <ul className="space-y-0.5 px-2">
              {BOTTOM_ITEMS.map((item) =>
                item.isLogout ? (
                  <li key={item.id}>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-md font-semibold text-gray-800 hover:bg-red-50 hover:text-[#E8431A] transition"
                    >
                      <item.icon className="w-4 h-4" strokeWidth={1.8} />
                      {item.label}
                    </button>
                  </li>
                ) : (
                  <NavItem key={item.id} item={item} />
                ),
              )}
            </ul>
          </div>
        </div>
      </aside>

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Yes, Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default Sidebar;