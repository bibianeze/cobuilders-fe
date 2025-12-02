// src/pages/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import authimg from "../assets/authimg.png";

const SignUp = () => {
  const navigate = useNavigate();

  //  form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  //  handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");

    // --- Client-side validation ---
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email address.";

    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // --- Submit to backend ---
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed. Please try again.");
      }

      //  Success message and redirect
      setSuccessMsg("Account created successfully! Redirecting to Sign In...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };
   const backtohome = ()=>{
    navigate("/")
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden w-full">
      {/* Left image */}
      <div className="hidden md:flex h-screen w-full">
        <img
          src={authimg}
          alt="Authentication"
          className="w-full h-full object-center"
        />
      </div>

      {/* Right form */}
      <div className="flex justify-center items-center bg-white px-6 py-10 md:px-16">
        <div className="w-full px-6">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#31417F] cursor-pointer" onClick={backtohome}>Sign Up</h3>
            <p className="text-gray-600 mt-2">Create an account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } w-full py-3 px-4 rounded-lg focus:outline-none focus:border-[#31417F] transition`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } w-full py-3 px-4 rounded-lg focus:outline-none focus:border-[#31417F] transition`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-4 top-3.5 text-gray-500 hover:text-[#31417F] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Server or success messages */}
            {serverError && (
              <p className="text-red-500 text-sm mt-1">{serverError}</p>
            )}
            {successMsg && (
              <p className="text-green-600 text-sm mt-1">{successMsg}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF5416] hover:bg-[#e04a12] text-white font-semibold w-full py-3 rounded-lg transition-all duration-300"
            >
              {loading ? "Creating account..." : "Continue"}
            </button>

            {/* Sign In link */}
            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <span
                className="text-[#31417F] font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
