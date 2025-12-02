// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useBooking } from "./BookingContext"; // import booking context safely

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("cobuilders_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Error loading user:", err);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("cobuilders_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("cobuilders_user");
      }
    } catch (err) {
      console.error("Error saving user:", err);
    }
  }, [user]);

  const logout = () => {
      localStorage.clear()
    setUser(null);
    localStorage.removeItem("cobuilders_user");

  };

  // Provide headers for authenticated requests
  const getAuthHeaders = () => {
    if (!user?.token) return { "Content-Type": "application/json" };
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
