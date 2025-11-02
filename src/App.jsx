// src/App.jsx
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Reviews from "./components/Reviews";
import ExploreCleaning from "./components/ExploreCleaning";
import Offers from "./components/Offers";
import WhyChoose from "./components/WhyChoose";
import Faq from "./components/Faq";
import OurCustomers from "./components/OurCustomers";
import About from "./pages/About";
import BookingPage from "./pages/BookingPage";
import ServiceSelection from "./pages/ServiceSelection";
import Summary from "./pages/Summary";
import Payment from "./pages/Payment";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Appointments from "./pages/Dashboard/Appointments";
import Bookings from "./pages/Dashboard/Bookings";
import ResetPassword from "./pages/ResetPasssword";

function App() {
  const location = useLocation();

  // ✅ Updated hidden navbar/footer routes
  const hideNavbarAndFooter = [
    "/bookings",
    "/booking/services",
    "/booking/summary",
    "/booking/payment",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password/:token"
  ];

  // ✅ Also hide for all dashboard sub-routes dynamically
    const isResetPassword = location.pathname.startsWith("/reset-password");
  const isDashboard = location.pathname.startsWith("/dashboard");
  const shouldHideLayout = hideNavbarAndFooter.includes(location.pathname) || isDashboard || isResetPassword ;

  return (
    <>
      {/* ✅ Only show Navbar if not hidden */}
      {!shouldHideLayout && <Navbar />}

      <Routes>
        {/* ✅ Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Reviews />
              <ExploreCleaning />
              <About />
              <Offers />
              <WhyChoose />
              <Faq />
              <OurCustomers />
              <Footer />
            </>
          }
        />

        {/* ✅ Booking Flow */}
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/booking/services" element={<ServiceSelection />} />
        <Route path="/booking/summary" element={<Summary />} />
        <Route path="/booking/payment" element={<Payment />} />

        {/* ✅ Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ✅ Dashboard Section (with nested routes) */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="bookings" element={<Bookings />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>
      </Routes>

      {/* ✅ Footer appears only on normal pages */}
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
