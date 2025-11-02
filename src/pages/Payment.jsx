// src/pages/Payment.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import image from "../assets/paystackimg.png";

const Payment = () => {
  const navigate = useNavigate();
  const { personal, spaces, service, frequency, addOrder, resetBooking } = useBooking();
  const { user } = useAuth();

  const [cardNumber, setCardNumber] = useState(""); // For mock validation only
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const userEmail = user?.email || personal?.email || "user@example.com";
  const total = (service?.price || 0) * (spaces?.bedroom || 0);

  // Simple input validation
  const validate = () => {
    const e = {};
    if (!cardNumber) e.cardNumber = "Card number is required";
    else if (!/^\d{12,19}$/.test(cardNumber.replace(/\s/g, "")))
      e.cardNumber = "Enter a valid card number";

    if (!expiry) e.expiry = "Expiry is required";
    else if (!/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = "Expiry must be MM/YY";

    if (!cvv) e.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(cvv)) e.cvv = "Enter CVV";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Mock payment handler
// Mock payment handler
const handlePay = (e) => {
  e.preventDefault();
  if (!validate()) return;

  // Show success modal
  setShowSuccess(true);


  resetBooking();

  // Wait 2 seconds before redirecting
  setTimeout(() => {
    navigate("/dashboard/appointments");
  }, 2000); // 2000ms = 2 seconds
};


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex justify-between w-full items-center mb-3 sm:mb-0">
            <div className="h-12 rounded-lg flex items-center justify-center">
              <img src={image} alt="Paystack logo" className="h-10" />
            </div>
            <div>
              <p className="text-[#717070]">{userEmail}</p>
              <p className="flex gap-2 items-center text-[#717070] text-lg">
                Pay:{" "}
                <span className="text-[#FF5416] text-xl font-semibold">
                  ₦{total.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 text-center">
          Enter Card Details 
        </h2>

        <form onSubmit={handlePay} className="space-y-5">
          {/* Card Number */}
          <div className="w-full">
            <div className={`border rounded-lg px-4 py-2 text-gray-500 ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}>
              <p className="text-xs mb-1 text-gray-500">CARD NUMBER</p>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full outline-none text-base text-black placeholder-gray-400"
              />
            </div>
            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className={`border rounded-lg px-4 py-2 text-gray-500 ${errors.expiry ? "border-red-500" : "border-gray-300"}`}>
                <p className="text-xs mb-1 text-gray-500">EXPIRY DATE</p>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full outline-none text-base text-black placeholder-gray-400"
                />
              </div>
              {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
            </div>

            <div>
              <div className={`border rounded-lg px-4 py-2 text-gray-500 ${errors.cvv ? "border-red-500" : "border-gray-300"}`}>
                <p className="text-xs mb-1 text-gray-500">CVV</p>
                <input
                  type="text"
                  placeholder="000"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full outline-none text-base text-black placeholder-gray-400"
                />
              </div>
              {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5 mt-6">
            <button
              type="button"
              onClick={() => navigate("/booking/summary")}
              className="w-full px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              disabled={showSuccess}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full px-6 py-2.5 bg-[#FF5416] text-white rounded-lg hover:bg-[#f2a487] transition-all disabled:opacity-60"
              disabled={showSuccess}
            >
              Pay ₦{total.toLocaleString()}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
{showSuccess && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-80 animate-fade-in">
      <div className="text-green-500 text-5xl mb-4">✔</div>
      <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
     
      <button
        onClick={() => navigate("/dashboard/appointments")}
        className="mt-3 px-6 py-2 bg-[#FF5416] text-white rounded-lg hover:bg-[#f2a487] transition-all"
      >
        Go to Appointments
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Payment;
