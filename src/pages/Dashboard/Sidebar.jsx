import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Calendar, ClipboardList, LogOut } from "lucide-react";
import clsx from "clsx";
import broomicon from "../../assets/game-icons_broom.png"; 
import { useAuth } from "../../context/AuthContext"; // ✅ import auth context

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ get setUser from context

  const navLinks = [
    { name: "Bookings", path: "/dashboard/bookings", icon: Calendar },
    { name: "Appointments", path: "/dashboard/appointments", icon: ClipboardList },
  ];

  // ✅ handle logout
  const handleLogout = () => {
    // setUser(null); // clear user from context
    // localStorage.removeItem("cobuilders_user"); // clear from localStorage
    localStorage.clear()
    navigate("/signin"); // redirect to signin
  };
  const handleGoBack = ()=>{
    navigate("/")
  }

  return (
    <>
      {/* Sidebar overlay (mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <aside
        className={clsx(
          "fixed md:static z-50 inset-y-0 left-0 w-64 bg-white shadow-md flex flex-col justify-between transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div>
          <div className="flex items-center py-4 gap-1 cursor-pointer" onClick={handleGoBack}>
            <img src={broomicon} alt="logo" className="w-8 h-8" />
            <h1 className="font-bold text-2xl">CoBuilders</h1>
          </div>

          <nav className="mt-6 flex flex-col gap-2 px-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-[#828ebe]",
                      isActive && "bg-[#31417F] text-white font-semibold"
                    )
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={18} />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout} // ✅ updated
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 border-t"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
