import React, { useEffect, useState } from "react";
import { Calendar, Clock, Users, CheckCircle2, XCircle } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // helper functions for formatting
  const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (isoString) =>
    new Date(isoString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    fetch("http://localhost:8080/api/reservations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reservations");
        return res.json();
      })
      .then(async (data) => {
        // enrich each reservation with restaurant + table details
        const enriched = await Promise.all(
          data.map(async (reservation) => {
            const restaurantRes = await fetch(
              `http://localhost:8080/api/restaurants/${reservation.restaurantId}`
            );
            const restaurant = await restaurantRes.json();

            const tableRes = await fetch(
              `http://localhost:8080/api/tables/${reservation.tableId}`
            );
            const table = await tableRes.json();

            return {
              id: reservation.id,
              restaurantName: restaurant.name,
              tableId: table.id,
              reservationDate: formatDate(reservation.reservationTime),
              reservationTime: formatTime(reservation.reservationTime),
              bookedOn: formatDate(new Date()), // current date
              status: reservation.confirmed ? "Confirmed" : "Pending",
              guestCount: table.seats, // assuming your table entity has "seats"
            };
          })
        );

        setBookings(enriched);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b border-gray-300 pb-4">
          My Reservations
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">
            You don’t have any reservations yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {booking.restaurantName}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Table: {booking.tableId}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 text-gray-700">
                  <p className="flex items-center gap-2">
                    <Clock size={18} className="text-gray-500" />
                    <span>Time: </span>
                    <span className="font-medium">{booking.reservationTime}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={18} className="text-gray-500" />
                    <span>Date: </span>
                    <span className="font-medium">{booking.reservationDate}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={18} className="text-gray-500" />
                    <span>Guests: </span>
                    <span className="font-medium">{booking.guestCount}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={18} className="text-gray-500" />
                    <span>Booked On: </span>
                    <span className="font-medium">{booking.bookedOn}</span>
                  </p>
                </div>

                <div className="mt-5">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status === "Confirmed" ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Clock size={16} />
                    )}
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
