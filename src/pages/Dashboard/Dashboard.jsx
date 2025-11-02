import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import Bookings from "./Bookings";
import Appointments from "./Appointments";
import { DashboardProvider } from "../../context/DashboardContext"; // ✅ import

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <DashboardProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardNavbar setMobileOpen={setMobileOpen} />

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Appointments />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/bookings" element={<Bookings />} />
            </Routes>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
