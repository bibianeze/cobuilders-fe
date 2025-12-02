import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import authimg from "../assets/authimg.png";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerError("");
    setLoading(true);

    try {
      //  Send login request to backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user globally
      setUser({
        email: data.user.email,
        token: data.token,
      });

      navigate("/dashboard");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const backtosignup = ()=>{
    navigate("/signup")
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden w-full">
      {/* Left image */}
      <div className="hidden md:flex h-screen w-full">
        <img src={authimg} alt="Auth" className="w-full h-full object-center" />
      </div>

      {/* Right form */}
      <div className="flex justify-center items-center bg-white px-6 py-10 md:px-16">
        <div className="w-full px-6">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#31417F] cursor-pointer" onClick={backtosignup}>Sign In</h3>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
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
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Server error */}
            {serverError && <p className="text-red-600 text-sm">{serverError}</p>}

            {/* Forgot Password */}
            <div className="text-right">
              <p
                onClick={() => navigate("/forgot-password")}
                className="text-[#FF5416] text-sm font-medium cursor-pointer hover:underline"
              >
                Forgot Password?
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF5416] hover:bg-[#e04a12] text-white font-semibold w-full py-3 rounded-lg transition-all duration-300"
            >
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
