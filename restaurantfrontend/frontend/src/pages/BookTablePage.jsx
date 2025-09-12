import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ViewTablesPage = () => {
  const [tables, setTables] = useState([]);
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tables/restaurant/${restaurantId}`)
      .then((res) => setTables(res.data))
      .catch((err) => console.error(err));
  }, [restaurantId]);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen p-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 drop-shadow-sm">
        Restaurant Tables
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tables.map((table) => (
          <div
            key={table.id}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {/* Table Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Table #{table.id}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  table.available
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {table.available ? "Available Now" : "Not Available"}
              </span>
            </div>

            {/* Table Details */}
            <div className="space-y-3 mb-4">
              <p className="text-gray-600">
                <span className="font-semibold">Seats:</span> {table.capacity}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Location:</span>{" "}
                {table.location || "N/A"}
              </p>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() =>
                navigate(`/confirm/${table.restaurant_id}/${table.id}`)
              }
              disabled={!table.available}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                table.available
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {table.available ? "Book Now" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTablesPage;
