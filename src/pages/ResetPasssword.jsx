import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(res.data.message);
      setPassword("");
      setConfirm("");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong, try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Reset Your Password
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-red-500">{message}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg transition-colors ${
            loading
              ? "bg-[#FF5416] cursor-not-allowed"
              : "bg-[#FF5416] hover:bg-[#ff5416d4]"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
