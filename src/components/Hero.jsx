import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroimg from "../assets/Frame 2121454611.png";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext"; // ✅ import context

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ get user from context

  const [showModal, setShowModal] = useState(false);

  const handleBookNow = () => {
    if (user?.email) {
      // ✅ If user is logged in, go to booking page
      navigate("/bookings");
    } else {
      // ✅ If user is not logged in, show modal
      setShowModal(true);
    }
  };

  return (
    <div className="relative w-full h-[90vh] md:h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={heroimg}
        alt="Cleaning service"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white space-y-4">
        <p className="text-sm tracking-wide uppercase">
          The Number One Cleaning Service Solution
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-2xl leading-snug">
          Professional Cleaning Services For Your Home
        </h1>

        <button
          onClick={handleBookNow}
          className="bg-[#FF5416] mt-4 px-6 py-2 rounded-lg text-white font-semibold border border-transparent hover:bg-transparent hover:border-[#FF5416] transition-all duration-300"
        >
          Book Now
        </button>
      </div>

      {/* Modal (only shows when not logged in) */}
      {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Hero;
