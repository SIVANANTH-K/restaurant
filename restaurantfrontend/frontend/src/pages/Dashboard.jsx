import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Dummy statistics
  const stats = {
    totalBookings: 25,
    todayBookings: 4,
    totalUsers: 12,
    availableTables: 8,
  };

  // Dummy booking details
  const [bookings] = useState([
    {
      id: 1,
      userName: "John Doe",
      email: "john@example.com",
      date: "2025-08-18",
      time: "7:00 PM",
      tableNo: "T1",
      guests: 4,
      status: "Confirmed",
    },
    {
      id: 2,
      userName: "Jane Smith",
      email: "jane@example.com",
      date: "2025-08-18",
      time: "8:00 PM",
      tableNo: "T2",
      guests: 2,
      status: "Cancelled",
    },
    {
      id: 3,
      userName: "Michael Lee",
      email: "michael@example.com",
      date: "2025-08-19",
      time: "6:30 PM",
      tableNo: "T3",
      guests: 5,
      status: "Confirmed",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
      {/* Header with title and buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-3">
          <Link
            to="/manage-tables"
            className="bg-gray-700 hover:bg-gray-900 text-white px-4 sm:px-6 py-2 rounded-xl shadow-md transition"
          >
            Manage Tables
          </Link>
          <Link
            to="/viewtables"
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 rounded-xl shadow-md transition"
          >
            View Tables
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Total Bookings</h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {stats.totalBookings}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Today’s Bookings</h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {stats.todayBookings}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Available Tables</h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {stats.availableTables}
          </p>
        </div>
      </div>

      {/* Booking Details Table */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Booking Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Table No</th>
                <th className="p-3">Guests</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-gray-100 transition border-b border-gray-200"
                >
                  <td className="p-3 font-medium">{b.userName}</td>
                  <td className="p-3">{b.email}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">{b.time}</td>
                  <td className="p-3">{b.tableNo}</td>
                  <td className="p-3">{b.guests}</td>
                  <td
                    className={`p-3 font-semibold ${
                      b.status === "Confirmed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {b.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
