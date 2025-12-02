import React, { useEffect } from "react";
import emptyImage from "../../assets/empty.png";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { useDashboard } from "../../context/DashboardContext"; // Import the shared context

const Appointments = () => {
  const navigate = useNavigate();
  const { orders, loading, fetchBookings, updateBookingStatus } = useBooking();
  const { searchTerm } = useDashboard(); // Get the current search term

  // Fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (orderId) => {
    await updateBookingStatus(orderId, "done");
  };

  // Status badge
  const StatusBadge = ({ status }) => {
    let color = "bg-yellow-500";
    if (status?.toLowerCase() === "done") color = "bg-green-500";
    else if (status?.toLowerCase() === "cancelled") color = "bg-red-500";

    return (
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  //  Filter appointments by search input
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    return (
      order._id?.toLowerCase().includes(term) ||
      order.serviceType?.toLowerCase().includes(term) ||
      order.frequency?.toLowerCase().includes(term) ||
      order.status?.toLowerCase().includes(term) ||
      order.price?.toString().includes(term) ||
      new Date(order.createdAt)
        .toLocaleDateString()
        .toLowerCase()
        .includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading your appointments...
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 md:px-8 lg:px-12 py-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className="text-2xl font-semibold text-[#31417F]">My Appointments</h3>
        <button
          onClick={() => navigate("/bookings")}
          className="bg-[#31417F] hover:bg-[#6171ae] text-white px-4 py-2 rounded-md"
        >
          Add New Booking
        </button>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-lg p-6 shadow-sm min-h-[60vh]">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <img src={emptyImage} alt="empty" className="mx-auto w-48 mb-4" />
            <p className="text-gray-600 mb-4">
              {orders.length === 0
                ? "You don’t have any bookings yet."
                : "No appointments match your search."}
            </p>
            <button
              onClick={() => navigate("/bookings")}
              className="bg-[#31417F] hover:bg-[#6171ae] text-white px-5 py-2 rounded-md"
            >
              Add New Booking
            </button>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-[#E1E5FF] text-[#292929] text-left">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Frequency</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="py-3 px-4 text-[#31417F] font-semibold">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 capitalize">
                      {order.serviceType || "—"}
                    </td>
                    <td className="py-3 px-4 capitalize">
                      {order.frequency || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={order.status || "pending"} />
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      ₦{order.price?.toLocaleString() || "0"}
                    </td>
                    <td className="py-3 px-4">
                      {order.status?.toLowerCase() !== "done" && (
                        <button
                          onClick={() => handleUpdateStatus(order._id)}
                          className="px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-green-600 transition-all text-sm"
                        >
                          Mark as Done
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
