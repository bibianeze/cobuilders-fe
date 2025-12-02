// src/pages/BookingPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

// ✅ Reusable Input Component
const Input = ({ label, placeholder, value, onChange, error, type = "text" }) => (
  <div className="w-full">
    <label className="block text-sm sm:text-base font-medium mb-1 text-gray-700">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#31417F] text-sm sm:text-base ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// ✅ Reusable Number Picker
const NumberPicker = ({ label, value, onChange }) => {
  const nums = [1, 2, 3, 4, 5];
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm sm:text-base font-medium text-gray-700">
          {label}
        </label>
      </div>
      <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
        {nums.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center border text-sm sm:text-base transition-all ${
              value === n
                ? "bg-[#31417F] text-white border-[#31417F]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#31417F]"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

const BookingPage = () => {
  const navigate = useNavigate();
  const { personal, setPersonal, spaces, setSpaces } = useBooking();
  const { user } = useAuth();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Validate input
  const validate = () => {
    const e = {};
    if (!personal.firstName.trim()) e.firstName = "First name is required";
    if (!personal.lastName.trim()) e.lastName = "Last name is required";
    if (!personal.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9+]{7,15}$/.test(personal.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (!personal.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email.trim()))
      e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Handle Next
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!user || !user.token) {
      alert("Please sign in to continue.");
      navigate("/signin");
      return;
    }

    if (!spaces.bedroom || !spaces.bathroom) {
      alert("Please select both bedroom and bathroom count before continuing.");
      return;
    }

    setLoading(true);

    // Save to context (no API call yet)
    setPersonal({ ...personal });
    setSpaces({ ...spaces });

    //  Move to the next page (Service selection)
    setTimeout(() => {
      navigate("/booking/services");
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-3 sm:px-4 py-6 sm:py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-[#31417F]">
          Let’s know how to reach you
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="First name"
              placeholder="e.g. John"
              value={personal.firstName}
              onChange={(e) =>
                setPersonal({ ...personal, firstName: e.target.value })
              }
              error={errors.firstName}
            />
            <Input
              label="Last name"
              placeholder="e.g. Doe"
              value={personal.lastName}
              onChange={(e) =>
                setPersonal({ ...personal, lastName: e.target.value })
              }
              error={errors.lastName}
            />
            <Input
              label="Phone number"
              placeholder="e.g. 08123456789"
              value={personal.phone}
              onChange={(e) =>
                setPersonal({ ...personal, phone: e.target.value })
              }
              error={errors.phone}
            />
            <Input
              label="Email address"
              placeholder="e.g. abc@gmail.com"
              value={personal.email}
              onChange={(e) =>
                setPersonal({ ...personal, email: e.target.value })
              }
              error={errors.email}
              type="email"
            />
          </div>

          {/* Space Selection */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-800">Your space</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="border p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <h1 className="text-sm sm:text-base font-semibold">Bedroom</h1>
                <NumberPicker
                  value={spaces.bedroom}
                  onChange={(n) => setSpaces({ ...spaces, bedroom: n })}
                />
              </div>
              <div className="border p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <h1 className="text-sm sm:text-base font-semibold">Bathroom</h1>
                <NumberPicker
                  value={spaces.bathroom}
                  onChange={(n) => setSpaces({ ...spaces, bathroom: n })}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full py-2 border rounded-md hover:bg-gray-100 transition text-sm sm:text-base"
              disabled={loading}
            >
              Back
            </button>

            <button
              type="submit"
              className="w-full py-2 bg-[#FF5416] text-white rounded-md hover:bg-[#e34b12] transition text-sm sm:text-base disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Saving..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
