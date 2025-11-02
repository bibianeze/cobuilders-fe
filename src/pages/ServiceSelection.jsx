// src/pages/ServiceSelection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

const services = [
  {
    id: 1,
    title: "Standard Cleaning",
    price: 15000,
    color: "#E8F0FE",
    includes: ["Dusting", "Mopping", "Bathroom Cleaning", "Vacuuming"],
  },
  {
    id: 2,
    title: "Deep Cleaning",
    price: 30000,
    color: "#FDEFEF",
    includes: ["Standard cleaning", "Furniture Polishing", "Window Cleaning"],
  },
  {
    id: 3,
    title: "Post Construction Cleaning",
    price: 50000,
    color: "#E9F7EF",
    includes: ["Debris Removal", "Surface Scrubbing", "Detailed Dusting"],
  },
];

const freqOptions = [
  { id: "one-time", label: "One time" },
  { id: "weekly", label: "Weekly" },
  { id: "two-weeks", label: "Every two weeks" },
  { id: "four-weeks", label: "Every 4 weeks" },
];

const ServiceCard = ({ s, selected, onSelect }) => (
  <div
    className={`border rounded-lg p-4 cursor-pointer flex flex-col justify-between transition-all ${
      selected ? "ring-2 ring-[#31417F]" : "hover:shadow-sm"
    }`}
    onClick={() => onSelect(s)}
    style={{ backgroundColor: s.color }}
  >
    <div className="flex justify-between items-start">
      <h4 className="font-semibold text-gray-900">{s.title}</h4>
      <div className="text-lg text-[#FF5416] font-bold">
        ₦{s.price.toLocaleString()}
      </div>
    </div>

    <ul className="mt-3 text-sm text-gray-700 space-y-1">
      {s.includes.map((item, index) => (
        <li key={index}>• {item}</li>
      ))}
    </ul>
  </div>
);

const ServiceSelection = () => {
  const navigate = useNavigate();
  const { setService, setFrequency, frequency } = useBooking();

  const [selectedService, setSelectedService] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState(frequency || "");

  const handleNext = () => {
    if (!selectedService) {
      alert("Please select a cleaning service before continuing.");
      return;
    }

    const chosenService = services.find((s) => s.id === selectedService);
    setService({
      id: chosenService.id,
      title: chosenService.title,
      price: chosenService.price,
      includes: chosenService.includes,
    });

    if (!selectedFrequency) {
      alert("Please select how often you want this cleaning.");
      return;
    }

    setFrequency(selectedFrequency);
    navigate("/booking/summary");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[#31417F]">
            What cleaning service do you need?
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Choose one service and cleaning frequency to continue
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              s={service}
              selected={selectedService === service.id}
              onSelect={(s) => setSelectedService(s.id)}
            />
          ))}
        </div>

        {/* Frequency Selection */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-gray-800">
            How often would you like us to clean?
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {freqOptions.map((option) => (
              <label
                key={option.id}
                className={`flex justify-between items-center p-3 border rounded-md cursor-pointer transition-all ${
                  selectedFrequency === option.id
                    ? "bg-[#31417F] text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedFrequency(option.id)}
              >
                <span>{option.label}</span>
                <input
                  type="checkbox"
                  checked={selectedFrequency === option.id}
                  readOnly
                  className="w-4 h-4"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
          <button
            onClick={() => navigate("/bookings")}
            className="w-full md:w-1/2 border border-gray-400 py-2 rounded-md hover:bg-gray-100 transition-all"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="w-full md:w-1/2 bg-[#FF5416] text-white py-2 rounded-md hover:bg-[#e64e14] transition-all"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;
