import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ourcustomers } from "../data/ourcustomers";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext"; // ✅ import context

const OurCustomers = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ get user from AuthContext
  const [showModal, setShowModal] = useState(false);

  const handleBookNow = (e) => {
    e.stopPropagation();
    if (user?.email) {
      navigate("/bookings"); // ✅ logged-in users go to booking
    } else {
      setShowModal(true); // ✅ logged-out users see modal
    }
  };

  return (
    <div className="py-16 bg-white relative z-20">
      <div className="container mx-auto w-11/12 flex flex-col gap-12">
        {/* Heading + Button */}
        <div className="flex flex-col items-center text-center gap-5">
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug">
            What our Customers say about CoBuilders
          </h3>

          <button
            type="button"
            onClick={handleBookNow}
            className="bg-[#FF5416] px-6 py-2 rounded-lg text-white hover:bg-[#f8a78a] transition duration-300 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {ourcustomers.map((ourcustomer, id) => (
            <div
              key={id}
              className="flex flex-col justify-between items-center text-center gap-4 bg-white h-full"
            >
              <img
                className="w-[70px] sm:w-[90px] md:w-[100px] object-contain"
                src={ourcustomer.image}
                alt={ourcustomer.heading}
              />
              <h3 className="text-lg md:text-xl font-semibold tracking-wide">
                {ourcustomer.heading}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base min-h-[100px] flex-grow">
                {ourcustomer.text}
              </p>

              {/* Stars aligned equally */}
              <div className="flex justify-center items-center w-[120px] h-[30px]">
                <img
                  src={ourcustomer.stars}
                  alt="stars"
                  className="w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for not logged-in users */}
      {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default OurCustomers;
