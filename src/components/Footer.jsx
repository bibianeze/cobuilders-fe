import React, { useState } from "react";
import broomicon from "../assets/game-icons_broom.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validate email when Enter is pressed
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSuccess("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-[#31417F] text-[#D9DBE3] py-16">
      <div className="container w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        {/* Left section */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
            Professional Cleaning Services For Your Home
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            <p>Get updates about CoBuilders</p>
            <input
              className="border border-[#D9DBE3] bg-transparent p-2 rounded w-full sm:w-4/5 focus:outline-none focus:ring-2 focus:ring-[#FF5416]"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}
          </form>
        </div>

        {/* Right section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Company */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-white">Company</h3>
            <ul className="space-y-3">
              <li className="cursor-pointer hover:underline">About</li>
              <li className="cursor-pointer hover:underline">Data and privacy</li>
              <li className="cursor-pointer hover:underline">Terms of service</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li className="cursor-pointer hover:underline">Book Now</li>
              <li className="cursor-pointer hover:underline">Sign In</li>
              <li className="cursor-pointer hover:underline">FAQs</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="cursor-pointer hover:underline">General inquiries</li>
              <li className="cursor-pointer hover:underline">Contact Support</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-[#D9DBE3] my-8" />

      {/* Bottom bar */}
      <div className="container w-11/12 mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-white">
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={broomicon} alt="logo" className="w-8 h-8" />
          <h1 className="font-bold text-3xl sm:text-4xl">CoBuilders</h1>
        </div>
        <p className="text-sm sm:text-base text-center sm:text-right">
          &copy; 2025 CoBuilders, Ltd
        </p>
      </div>
    </footer>
  );
};

export default Footer;
