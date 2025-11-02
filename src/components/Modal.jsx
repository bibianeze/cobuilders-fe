import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-xl w-11/12 max-w-sm shadow-2xl text-center">
        <h2 className="text-5xl text-[#31417F] font-bold mb-4">Oops!</h2>
        <p className="mb-6 text-[#31417F]">
          You must sign in or sign up first.
        </p>

        <div className="flex flex-col justify-center gap-4 items-center">
          <button
            onClick={() => navigate("/signin")}
            className="bg-[#FF5416] text-white px-16 py-2 rounded-lg hover:bg-[#f8a78a] transition"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-[#FF5416] text-white px-15 py-2 rounded-lg hover:bg-[#f8a78a] transition"
          >
            Sign Up
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-gray-500 hover:text-gray-700 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
