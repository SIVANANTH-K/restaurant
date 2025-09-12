import React, { useState } from "react";
import { CheckCircle, XCircle, Building2, Clock } from "lucide-react";

const ApproveRestaurant = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "Spice Hub", email: "spicehub@gmail.com", number: "9876543210", address: "Coimbatore", status: "PENDING" },
    { id: 2, name: "Taste Corner", email: "tastecorner@gmail.com", number: "9123456780", address: "Chennai", status: "APPROVED" },
    { id: 3, name: "Urban Bites", email: "urbanbites@gmail.com", number: "9988776655", address: "Bangalore", status: "REJECTED" },
    { id: 4, name: "Rural Bites", email: "ruralbites@gmail.com", number: "9988776656", address: "Coimbatore", status: "PENDING" },
  ]);

  // Stats
  const total = restaurants.length;
  const approved = restaurants.filter((r) => r.status === "APPROVED").length;
  const pending = restaurants.filter((r) => r.status === "PENDING").length;
  const rejected = restaurants.filter((r) => r.status === "REJECTED").length;

  // Handle approve/reject
  const updateStatus = (id, newStatus) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Approve Restaurants</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Restaurants</h2>
            <p className="text-2xl font-bold text-gray-900">{total}</p>
          </div>
          <Building2 className="text-gray-700" size={36} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Approved</h2>
            <p className="text-2xl font-bold text-gray-600">{approved}</p>
          </div>
          <CheckCircle className="text-green-600" size={36} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
            <p className="text-2xl font-bold text-gray-600">{pending}</p>
          </div>
          <Clock className="text-yellow-600" size={36} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Rejected</h2>
            <p className="text-2xl font-bold text-gray-600">{rejected}</p>
          </div>
          <XCircle className="text-red-600" size={36} />
        </div>
      </div>

      {/* Restaurant Frames */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((res) => (
          <div key={res.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{res.name}</h3>
            <p className="text-gray-600 text-sm">📧 {res.email}</p>
            <p className="text-gray-600 text-sm">📞 {res.number}</p>
            <p className="text-gray-600 text-sm">📍 {res.address}</p>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold 
                  ${res.status === "APPROVED" ? "bg-green-100 text-green-700" : ""}
                  ${res.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : ""}
                  ${res.status === "REJECTED" ? "bg-red-100 text-red-700" : ""}
                `}
              >
                {res.status}
              </span>

              {/* Approve / Reject buttons only if PENDING */}
              {res.status === "PENDING" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(res.id, "APPROVED")}
                    className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(res.id, "REJECTED")}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ApproveRestaurant;
