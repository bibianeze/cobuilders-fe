import React, { useState } from "react";
import { Menu, Bell, Search, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext"; //  import

const DashboardNavbar = ({ setMobileOpen }) => {
  const { user } = useAuth();
  const { searchTerm, setSearchTerm } = useDashboard(); // shared search term
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-4 md:px-6 py-3 sticky top-0 z-40">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-gray-700 hover:text-[#31417F]"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg md:text-xl font-semibold text-[#31417F]">Appointments</h2>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} //  shared search state
          className="bg-transparent outline-none ml-2 w-full text-sm text-gray-700"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => setShowSearch(true)}
          className="md:hidden text-gray-700 hover:text-[#31417F]"
        >
          <Search size={20} />
        </button>
        <Bell className="text-gray-600 cursor-pointer" size={20} />
        <div className="hidden md:block text-right">
          <p className="text-sm font-semibold">{user?.email?.split("@")[0]}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#31417F]">Search</h3>
            <button onClick={() => setShowSearch(false)} className="text-gray-700">
              <X size={22} />
            </button>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // ✅ shared for mobile too
              className="bg-transparent outline-none ml-2 w-full text-base text-gray-700"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardNavbar;
