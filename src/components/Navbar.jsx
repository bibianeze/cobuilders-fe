import React, { useState } from "react";
import broomicon from "../assets/game-icons_broom.png";
import calender from "../assets/solar_calendar-bold.png";
import { FaBars, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useAuth();

  const handleBookNow = () => {
    if (!user?.email) {
      setModalOpen(true);
    } else {
      navigate("/dashboard");
    }
    setMenuOpen(false); // close mobile menu when button clicked
  };

  return (
    <nav className="bg-transparent text-white fixed w-full z-50">
      <div className="container mx-auto w-11/12 flex justify-between items-center py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
        >
          <img src={broomicon} alt="logo" className="w-8 h-8" />
          <h1 className="font-bold text-2xl">CoBuilders</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-[120px]">
          <ul className="flex items-center gap-6">
            <li><a href="#home" className="hover:underline cursor-pointer">Home</a></li>
            <li><a href="#about" className="hover:underline cursor-pointer">About</a></li>
            <li><a href="#services" className="hover:underline cursor-pointer">Services</a></li>
            <li><a href="#faq" className="hover:underline cursor-pointer">FAQ</a></li>
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookNow}
              className="flex items-center border py-2 px-3 rounded-lg hover:bg-[#FF5416] gap-1 transition"
            >
              {user?.email ? "Your Bookings" : "Book Now"}
              <span className="w-[20px]">
                <img src={calender} alt="calendar" />
              </span>
            </button>

            {user?.email ? (
              <p className="text-white px-6 py-2 rounded-lg font-bold uppercase hover:bg-[#FF5416] hover:border transition">
                Hi, {user.email.split("@")[0]}
              </p>
            ) : (
              <button
                className="bg-[#FF5416] px-6 py-2 rounded-lg text-white hover:bg-[#f8a78a] hover:border transition"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-[#FF5416] text-2xl z-50"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1E1E1E]/95 backdrop-blur-md text-white absolute top-16 left-0 w-full flex flex-col items-center py-6 space-y-6 transition-all duration-300 ease-in-out">
          <a href="#home" onClick={() => setMenuOpen(false)} className="hover:text-[#FF5416] text-lg">Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-[#FF5416] text-lg">About</a>
          <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-[#FF5416] text-lg">Services</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="hover:text-[#FF5416] text-lg">FAQ</a>

          <button
            onClick={handleBookNow}
            className="flex items-center border py-2 px-3 rounded-lg hover:bg-[#FF5416] gap-1 transition"
          >
            {user?.email ? "Your Bookings" : "Book Now"}
            <span className="w-[20px]">
              <img src={calender} alt="calendar" />
            </span>
          </button>

          {user?.email ? (
            <p className="text-white px-6 py-2 rounded-lg font-bold uppercase hover:bg-[#FF5416] hover:border transition">
              Hi, {user.email.split("@")[0]}
            </p>
          ) : (
            <button
              className="bg-[#FF5416] px-6 py-2 rounded-lg text-white hover:bg-[#f8a78a] hover:border transition"
              onClick={() => {
                navigate("/signup");
                setMenuOpen(false);
              }}
            >
              Sign Up
            </button>
          )}
        </div>
      )}

      {/* Modal */}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
