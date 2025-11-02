import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import calender from "../assets/solar_calendar-bold.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext"; // ✅ import context

const ExploreCleaning = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ get user from AuthContext
  const [showModal, setShowModal] = useState(false);

  // Handle Book Now for all buttons
  const handleBookNow = () => {
    if (user?.email) {
      navigate("/bookings"); // ✅ logged-in users go to booking
    } else {
      setShowModal(true); // ✅ not logged-in users see modal
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto w-11/12 pt-8">
        <h1 className="text-[#0E132A] text-xl sm:text-2xl md:text-4xl font-bold leading-snug text-center pb-10">
          Explore all cleaning services at CoBuilders
        </h1>

        <div className="flex flex-col gap-10">
          {/* Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden min-h-[350px]">
            <div className="bg-[#31417F] flex flex-col justify-center gap-6 p-8 text-white">
              <h3 className="text-xl font-semibold">Deep Cleaning</h3>
              <p className="leading-[35px]">
                Give your home extra love with a Deep Cleaning from our excellent Cobuilders.
                Enjoy an in-depth cleaning session that involves moving furniture
                for better cleaning access.
              </p>
              <button
                onClick={handleBookNow}
                className="flex items-center border py-2 px-4 rounded-lg hover:bg-[#4c5c9a] gap-2 transition cursor-pointer self-start"
              >
                Book Now
                <img src={calender} alt="calendar" className="w-5" />
              </button>
            </div>
            <div className="hidden md:block">
              <img
                src={image1}
                alt="Deep Cleaning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden min-h-[350px]">
            <div className="hidden md:block">
              <img
                src={image2}
                alt="Standard Cleaning"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-[#FF5416] flex flex-col justify-center gap-6 p-8 text-white">
              <h3 className="text-xl font-semibold">Standard Cleaning</h3>
              <p className="leading-[35px]">
                Give your home extra love with a Standard Cleaning from our excellent Cobuilders.
                This package targets major areas of your home — living rooms, kitchens, bedrooms, and bathrooms.
              </p>
              <button
                onClick={handleBookNow}
                className="flex items-center border py-2 px-4 rounded-lg hover:bg-[#da9177] gap-2 transition cursor-pointer self-start"
              >
                Book Now
                <img src={calender} alt="calendar" className="w-5" />
              </button>
            </div>
          </div>

          {/* Section 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden min-h-[350px]">
            <div className="bg-[#31417F] flex flex-col justify-center gap-6 p-8 text-white">
              <h3 className="text-xl font-semibold">Move-in Cleaning</h3>
              <p className="leading-[35px]">
                Got yourself a new space? Let’s help you get settled in with a
                thorough Move-in Cleaning of your new home.
              </p>
              <button
                onClick={handleBookNow}
                className="flex items-center border py-2 px-4 rounded-lg hover:bg-[#4c5c9a] gap-2 transition cursor-pointer self-start"
              >
                Book Now
                <img src={calender} alt="calendar" className="w-5" />
              </button>
            </div>
            <div className="hidden md:block">
              <img
                src={image3}
                alt="Move-in Cleaning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for not logged-in users */}
      {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ExploreCleaning;
