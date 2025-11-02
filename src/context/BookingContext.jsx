import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../utils/api";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();

  const storedPersonal = JSON.parse(localStorage.getItem("personalInfo")) || {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  };

  const storedSpaces = JSON.parse(localStorage.getItem("spacesInfo")) || {
    bathroom: 1,
    bedroom: 1,
  };

  const storedService = JSON.parse(localStorage.getItem("serviceInfo")) || {
    type: "",
    title: "",
    price: 0,
    includes: [],
  };

  const storedFrequency = localStorage.getItem("frequencyInfo") || "one-time";

  const [personal, setPersonal] = useState(storedPersonal);
  const [spaces, setSpaces] = useState(storedSpaces);
  const [service, setService] = useState(storedService);
  const [frequency, setFrequency] = useState(storedFrequency);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Persist booking info while user is active
  useEffect(() => localStorage.setItem("personalInfo", JSON.stringify(personal)), [personal]);
  useEffect(() => localStorage.setItem("spacesInfo", JSON.stringify(spaces)), [spaces]);
  useEffect(() => localStorage.setItem("serviceInfo", JSON.stringify(service)), [service]);
  useEffect(() => localStorage.setItem("frequencyInfo", frequency), [frequency]);

  // ✅ Create a booking
  const createBooking = async () => {
    if (!user?.token) {
      alert("You must be logged in to book a service.");
      return;
    }

    const bookingData = {
      firstName: personal.firstName,
      lastName: personal.lastName,
      email: personal.email,
      phone: personal.phone,
      bedroom: spaces.bedroom,
      bathroom: spaces.bathroom,
      serviceType: service.type,
      serviceTitle: service.title,
      price: service.price,
      frequency,
    };

    try {
      setLoading(true);
      const res = await api.post("/bookings/create", bookingData);
      setOrders((prev) => [res.data, ...prev]);
      clearBooking();
      return res.data;
    } catch (error) {
      console.error("❌ Error creating booking:", error.response?.data || error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch user bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings");
      const bookings = Array.isArray(res.data) ? res.data : res.data.bookings;
      setOrders(bookings || []);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update booking status
  const updateBookingStatus = async (id, status) => {
    try {
      const res = await api.put(`/bookings/${id}`, { status });
      const updatedBooking = res.data;
      setOrders((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: updatedBooking.status } : b))
      );
      return updatedBooking;
    } catch (error) {
      console.error("❌ Error updating status:", error.response?.data || error);
    }
  };

  // ✅ Cancel booking
  const cancelBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      setOrders((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("❌ Error canceling booking:", error.response?.data || error);
    }
  };

  // ✅ Clear all booking info after creating a booking
  const clearBooking = () => {
    setPersonal({ firstName: "", lastName: "", phone: "", email: "" });
    setSpaces({ bathroom: 1, bedroom: 1 });
    setService({ type: "", title: "", price: 0, includes: [] });
    setFrequency("one-time");

    localStorage.removeItem("personalInfo");
    localStorage.removeItem("spacesInfo");
    localStorage.removeItem("serviceInfo");
    localStorage.removeItem("frequencyInfo");
  };

  // ✅ Reset all booking info when user logs out
  const resetBooking = () => {
    clearBooking();
    setOrders([]);
  };

  return (
    <BookingContext.Provider
      value={{
        personal,
        setPersonal,
        spaces,
        setSpaces,
        service,
        setService,
        frequency,
        setFrequency,
        orders,
        loading,
        createBooking,
        fetchBookings,
        updateBookingStatus,
        cancelBooking,
        clearBooking,
     // ✅ expose this for AuthContext
          resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
