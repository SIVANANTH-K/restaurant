import React, { useState } from "react";
import { Building2, Users, ClipboardList, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Sample data
  const [restaurants] = useState([
    { id: 1, name: "Spice Hub", email: "spicehub@gmail.com", number: "9876543210", address: "Coimbatore", status: "PENDING" },
    { id: 2, name: "Urban Bites", email: "urbanbites@gmail.com", number: "9988776655", address: "Bangalore", status: "PENDING" },
    { id: 3, name: "Taste Corner", email: "tastecorner@gmail.com", number: "9123456780", address: "Chennai", status: "APPROVED" },
  ]);

  // Stats
  const totalRestaurants = restaurants.length;
  const pendingApprovals = restaurants.filter((r) => r.status === "PENDING").length;
  const activeCustomers = 120; // sample value
  const totalBookings = 350; // sample value

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => navigate("/approve-restaurants")}
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-xl shadow"
        >
          Pending Approvals <ArrowRight size={18} />
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Restaurants</h2>
            <p className="text-2xl font-bold text-gray-900">{totalRestaurants}</p>
          </div>
          <Building2 className="text-gray-600" size={40} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Pending Approvals</h2>
            <p className="text-2xl font-bold text-gray-900">{pendingApprovals}</p>
          </div>
          <Clock className="text-yellow-600" size={40} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Active Customers</h2>
            <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
          </div>
          <Users className="text-green-600" size={40} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Bookings</h2>
            <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
          </div>
          <ClipboardList className="text-blue-600" size={40} />
        </div>
      </div>

      {/* Pending Approval List */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Approval List</h2>
        <div className="grid gap-4">
          {restaurants.filter((r) => r.status === "PENDING").map((res) => (
            <div
              key={res.id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-gray-800">{res.name}</h3>
              <p className="text-sm text-gray-600">📧 {res.email}</p>
              <p className="text-sm text-gray-600">📞 {res.number}</p>
              <p className="text-sm text-gray-600">📍 {res.address}</p>
              <span className="mt-2 inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-xs font-semibold">
                {res.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
