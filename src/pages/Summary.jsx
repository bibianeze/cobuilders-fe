import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const formatNG = (n) => `₦${n.toLocaleString()}`;

// Map frontend labels to backend enum values
const serviceEnumMap = {
  "Standard Cleaning": "standard",
  "Deep Cleaning": "deep",
  "Post Construction Cleaning": "post_construction",
};

const frequencyEnumMap = {
  "one-time": "one_time",
  weekly: "weekly",
  "two_weeks": "two_weeks",
  "four_weeks": "four_weeks",
};

const Summary = () => {
  const navigate = useNavigate();
  const { personal, spaces, service, frequency } = useBooking();
  const { user, getAuthHeaders } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const total = service?.price && spaces?.bedroom ? service.price * spaces.bedroom : 0;

  const handleProceedToPay = async () => {
    if (!user?.token) {
      setError("You must be logged in to make a booking.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const bookingData = {
        firstName: personal.firstName,
        lastName: personal.lastName,
        email: personal.email.toLowerCase(),
        phone: personal.phone,
        bedrooms: spaces.bedroom,
        bathrooms: spaces.bathroom,
        serviceType: serviceEnumMap[service.title] || "standard",
        frequency: frequencyEnumMap[frequency] || "one_time",
        price: total, // backend expects 'price'
        serviceIncludes: service.includes || [],
      };

      const response = await axios.post(
        `${API_URL}/bookings`,
        bookingData,
        { headers: getAuthHeaders() }
      );

      if (response.status === 201 || response.status === 200) {
        
        navigate("/booking/payment");
      }
    } catch (err) {
      console.error("Booking submission failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Booking Summary
        </h2>

        {/* Personal Details */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <h3 className="text-[#969696] text-sm">First Name</h3>
            <p className="font-medium">{personal.firstName || "—"}</p>
          </div>
          <div>
            <h3 className="text-[#969696] text-sm">Last Name</h3>
            <p className="font-medium">{personal.lastName || "—"}</p>
          </div>
          <div>
            <h3 className="text-[#969696] text-sm">Phone Number</h3>
            <p className="font-medium">{personal.phone || "—"}</p>
          </div>
          <div>
            <h3 className="text-[#969696] text-sm">Email Address</h3>
            <p className="font-medium">{personal.email || "—"}</p>
          </div>

          {/* Service Details */}
<div>
  <h3 className="text-[#969696] text-sm">Service Task</h3>
  <p className="capitalize font-medium">{service.title || "—"}</p>

  {service.includes && service.includes.length > 0 && (
    <ul className="list-disc list-inside text-gray-700 mt-2 text-sm">
      {service.includes.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )}
</div>

{/* Frequency Details */}
<div>
  <h3 className="text-[#969696] text-sm">Frequency</h3>
  <p className="capitalize font-medium">
    {frequency
      ? frequency === "one-time"
        ? "One-time"
        : frequency === "weekly"
        ? "Weekly"
        : frequency === "two_weeks"
        ? "Every Two Weeks"
        : frequency === "four_weeks"
        ? "Every Four Weeks"
        : frequency
      : "—"}
  </p>
</div>

        </div>

        {/* Space Summary */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Space Summary</h3>
          <p>Bedrooms: {spaces.bedroom || 0}</p>
          <p>Bathrooms: {spaces.bathroom || 0}</p>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6 text-lg">
          <p className="font-bold">Total Amount</p>
          <p className="font-bold text-[#FF5416]">{formatNG(total)}</p>
        </div>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            onClick={() => navigate("/booking/services")}
            className="px-4 py-2 border border-gray-300 rounded-md w-full hover:bg-gray-100 transition-all"
            disabled={loading}
          >
            Back
          </button>

          <button
            onClick={handleProceedToPay}
            className="px-6 py-2 bg-[#FF5416] text-white rounded-md w-full hover:bg-[#e14c14] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
