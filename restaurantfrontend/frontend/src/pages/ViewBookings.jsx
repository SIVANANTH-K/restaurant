import React, { useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  Search,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
} from "lucide-react";

const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([
    {
      id: "1",
      customerName: "John Smith",
      customerEmail: "john@example.com",
      customerPhone: "+1-234-567-8900",
      tableName: "Table 5",
      date: "2024-01-15",
      time: "19:00",
      guests: 4,
      status: "confirmed",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      customerEmail: "sarah@example.com",
      customerPhone: "+1-234-567-8901",
      tableName: "Table 12",
      date: "2024-01-15",
      time: "18:30",
      guests: 2,
      status: "pending",
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      customerName: "Mike Brown",
      customerEmail: "mike@example.com",
      customerPhone: "+1-234-567-8902",
      tableName: "Table 8",
      date: "2024-01-16",
      time: "20:00",
      guests: 6,
      status: "cancelled",
      createdAt: "2024-01-11",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todayBookings = bookings.filter((b) => b.date === "2024-01-15").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const totalGuests = bookings.reduce((sum, b) => sum + b.guests, 0);

  const getStatusClasses = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Bookings</h1>
          <p className="text-gray-500">Manage and track all reservations</p>
        </div>
        <div className="relative w-full sm:w-72 mt-4 sm:mt-0">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Today's Bookings</p>
            <p className="text-2xl font-bold text-gray-800">{todayBookings}</p>
          </div>
          <Calendar className="w-8 h-8 text-gray-600" />
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-2xl font-bold text-gray-800">{pendingBookings}</p>
          </div>
          <Clock className="w-8 h-8 text-gray-600" />
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Guests</p>
            <p className="text-2xl font-bold text-gray-800">{totalGuests}</p>
          </div>
          <Users className="w-8 h-8 text-gray-600" />
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          All Bookings
        </h2>

        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow transition bg-gray-50"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Customer Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {b.customerName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {b.customerEmail}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {b.customerPhone}
                      </span>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Table</p>
                      <p className="font-medium">{b.tableName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">{b.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p className="font-medium">{b.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Guests</p>
                      <p className="font-medium">{b.guests}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {b.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(b.id, "confirmed")}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
                      >
                        <CheckCircle className="w-4 h-4" /> Confirm
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, "cancelled")}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                      >
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium">No bookings found</p>
            <p>
              {searchTerm
                ? "Try adjusting your search."
                : "No bookings available at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
