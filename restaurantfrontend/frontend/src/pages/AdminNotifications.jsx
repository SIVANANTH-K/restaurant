import React, { useState } from "react";
import { AlertCircle, Building2, Info } from "lucide-react";

const AdminNotifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: "registration",
      title: "New Restaurant Registration",
      message: "Spice Hub has requested approval for registration.",
      restaurant: {
        name: "Spice Hub",
        email: "spicehub@gmail.com",
        number: "9876543210",
        address: "Coimbatore",
      },
      time: "2 hrs ago",
    },
    {
      id: 2,
      type: "issue",
      title: "Restaurant Closed",
      message: "Urban Bites has reported temporary closure due to renovation.",
      restaurant: {
        name: "Urban Bites",
        email: "urbanbites@gmail.com",
        number: "9988776655",
        address: "Bangalore",
      },
      time: "1 day ago",
    },
    {
      id: 3,
      type: "registration",
      title: "New Restaurant Registration",
      message: "Taste Corner has requested approval for registration.",
      restaurant: {
        name: "Taste Corner",
        email: "tastecorner@gmail.com",
        number: "9123456780",
        address: "Chennai",
      },
      time: "3 days ago",
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "registration":
        return <Building2 className="text-blue-600" size={28} />;
      case "issue":
        return <AlertCircle className="text-red-600" size={28} />;
      default:
        return <Info className="text-gray-600" size={28} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          Admin Notifications
        </h1>
      </div>

      {/* Notifications List */}
      <div className="grid gap-4 sm:gap-6">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="bg-white border border-gray-200 shadow-md rounded-2xl p-4 sm:p-6 hover:shadow-lg transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-shrink-0 flex justify-center sm:justify-start">
                {getIcon(note.type)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
                    {note.title}
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-500 text-center sm:text-right mt-1 sm:mt-0">
                    {note.time}
                  </span>
                </div>
                <p className="text-gray-700 mt-2 text-sm sm:text-base text-center sm:text-left">
                  {note.message}
                </p>

                {/* Restaurant Details */}
                <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 text-sm sm:text-base">
                  <p className="text-gray-600">
                    <span className="font-semibold">Name:</span>{" "}
                    {note.restaurant.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span>{" "}
                    {note.restaurant.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Phone:</span>{" "}
                    {note.restaurant.number}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Address:</span>{" "}
                    {note.restaurant.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="text-gray-600 text-center mt-10">
            No new notifications 🎉
          </p>
        )}
      </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
