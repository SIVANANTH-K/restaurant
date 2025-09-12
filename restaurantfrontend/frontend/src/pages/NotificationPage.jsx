import React, { useEffect, useState } from "react";
import { Bell, CheckCircle, XCircle, Clock } from "lucide-react";
import axios from "axios";

export default function NotificationPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reservations and restaurants in parallel
        const [resvRes, restRes] = await Promise.all([
          axios.get("http://localhost:8080/api/reservations"),
          axios.get("http://localhost:8080/api/restaurants"),
        ]);

        // Map restaurants into {id: name}
        const restaurantMap = {};
        restRes.data.forEach((r) => {
          restaurantMap[r.id] = r.name;
        });

        // Merge restaurant name into reservation
        const merged = resvRes.data.map((r) => ({
          ...r,
          restaurantName: restaurantMap[r.restaurantId] || "Unknown Restaurant",
        }));

        setReservations(merged);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading reservations...</p>;
  }

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-2">
          <Bell size={28} className="text-gray-700" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Notifications
          </h1>
        </div>
        <p className="text-gray-500 mb-8 text-sm sm:text-base">
          Stay updated with your bookings
        </p>

        {/* Reservation Notifications */}
        <div className="space-y-4">
          {reservations.length === 0 ? (
            <p className="text-gray-500">No reservations found</p>
          ) : (
            reservations.map((resv) => {
              let icon, title, message, color;

              if (resv.status === "confirmed") {
                icon = <CheckCircle size={28} className="text-green-500" />;
                title = "Booking Confirmed";
                message = "Your reservation is confirmed.";
                color = "text-green-600";
              } else if (resv.status === "cancelled") {
                icon = <XCircle size={28} className="text-red-500" />;
                title = "Booking Cancelled";
                message = "Your reservation has been cancelled.";
                color = "text-red-600";
              } else {
                icon = <Clock size={28} className="text-yellow-500" />;
                title = "Booking Pending";
                message = "Your reservation is pending approval.";
                color = "text-yellow-600";
              }

              return (
                <div
                  key={resv.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-200 flex items-start gap-4"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">{icon}</div>

                  {/* Content */}
                  <div>
                    <h2 className={`text-lg font-semibold ${color}`}>
                      {title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Your table at{" "}
                      <span className="font-medium">
                        {resv.restaurantName}
                      </span>{" "}
                      (Table {resv.tableId}) for{" "}
                      {formatDateTime(resv.reservationTime)}.
                    </p>
                    <p className="text-gray-600 text-sm mt-1">{message}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      Booked on: {formatDateTime(resv.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
