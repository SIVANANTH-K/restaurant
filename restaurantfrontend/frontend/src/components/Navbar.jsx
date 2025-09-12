import { NavLink, useNavigate } from "react-router-dom";
import {
  UtensilsCrossed,
  Home,
  LogIn,
  UserPlus,
  Shield,
  Search,
  Bell,
  Calendar,
  LogOut,
  LayoutDashboard,
  TableProperties,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("roleChange", handleStorageChange);
    return () => {
      window.removeEventListener("roleChange", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("roleChange"));
    navigate("/");
  };

  return (
    <nav className="bg-[#0F172A] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <UtensilsCrossed className="text-blue-100" size={32} />
          <span className="text-2xl font-bold text-blue-100">ServeTable</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center flex-1 space-x-6">
          <NavLink
            to="/"
            className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
          >
            <Home size={22} /> Home
          </NavLink>

          {role === "CUSTOMER" && (
            <>
              <NavLink
                to="/search"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <Search size={20} /> Search
              </NavLink>
              <NavLink
                to="/bookings"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <Calendar size={20} /> My Bookings
              </NavLink>
              <NavLink
                to="/notifications"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <Bell size={20} /> Notifications
              </NavLink>
            </>
          )}

          {role === "OWNER" && (
            <>
              <NavLink
                to="/dashboard"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <LayoutDashboard size={20} /> Dashboard
              </NavLink>
              <NavLink
                to="/manage-tables"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <TableProperties size={20} /> Manage Tables
              </NavLink>
              <NavLink
                to="/view-bookings"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <ClipboardList size={20} /> View Bookings
              </NavLink>
              <NavLink
                to="/notifications"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <Bell size={20} /> Notifications
              </NavLink>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <NavLink
                to="/admin-dashboard"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <LayoutDashboard size={20} /> Admin Dashboard
              </NavLink>
              <NavLink
                to="/approve-restaurants"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <Shield size={20} /> Approve
              </NavLink>
              <NavLink
                to="/admin-notifications"
                className="flex items-center gap-1 text-gray-100 font-medium hover:text-blue-100"
              >
                <Bell size={20} /> Notifications
              </NavLink>
            </>
          )}
        </div>

        {/* Right (Desktop) */}
        <div className="hidden md:flex space-x-4">
          {!role ? (
            <>
              <NavLink
                to="/login"
                className="flex items-center gap-1 text-gray-100 hover:text-blue-600 font-medium"
              >
                <LogIn size={22} /> Login
              </NavLink>
              <NavLink
                to="/register"
                className="flex items-center gap-1 text-gray-100 hover:text-blue-600 font-medium"
              >
                <UserPlus size={22} /> Register
              </NavLink>
              <NavLink
                to="/admin"
                className="flex items-center gap-1 text-gray-100 hover:text-blue-600 font-medium"
              >
                <Shield size={18} /> Admin
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-100 hover:text-red-500 font-medium"
            >
              <LogOut size={22} /> Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#1E293B] px-6 py-4 space-y-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-gray-100 font-medium hover:text-blue-100"
          >
            <Home size={20} className="inline mr-2" /> Home
          </NavLink>

          {role === "CUSTOMER" && (
            <>
              <NavLink
                to="/search"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <Search size={18} className="inline mr-2" /> Search
              </NavLink>
              <NavLink
                to="/bookings"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <Calendar size={18} className="inline mr-2" /> My Bookings
              </NavLink>
              <NavLink
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <Bell size={18} className="inline mr-2" /> Notifications
              </NavLink>
            </>
          )}

          {role === "OWNER" && (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <LayoutDashboard size={18} className="inline mr-2" /> Dashboard
              </NavLink>
              <NavLink
                to="/manage-tables"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <TableProperties size={18} className="inline mr-2" /> Manage
              </NavLink>
              <NavLink
                to="/view-bookings"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <ClipboardList size={18} className="inline mr-2" /> Bookings
              </NavLink>
              <NavLink
                to="/notifications"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <Bell size={18} className="inline mr-2" /> Notifications
              </NavLink>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <NavLink
                to="/admin-dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <LayoutDashboard size={18} className="inline mr-2" /> Admin
              </NavLink>
              <NavLink
                to="/approve-restaurants"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <Shield size={18} className="inline mr-2" /> Approve
              </NavLink>
              <NavLink
                to="/admin-notifications"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-100"
              >
                <Bell size={18} className="inline mr-2" /> Notifications
              </NavLink>
            </>
          )}

          {!role ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-600"
              >
                <LogIn size={18} className="inline mr-2" /> Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-600"
              >
                <UserPlus size={18} className="inline mr-2" /> Register
              </NavLink>
              <NavLink
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block text-gray-100 font-medium hover:text-blue-600"
              >
                <Shield size={18} className="inline mr-2" /> Admin
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block text-gray-100 font-medium hover:text-red-500"
            >
              <LogOut size={18} className="inline mr-2" /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
