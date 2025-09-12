import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchRestaurant = () => {
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch restaurants from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/restaurants") // backend endpoint
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch restaurants:", err);
        setLoading(false);
      });
  }, []);

  // Filter restaurants based on name and address only
  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.address?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading restaurants...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-100 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Find Your Perfect Restaurant
          </h1>
          <p className="mt-2 text-gray-600">
            Discover amazing dining experiences near you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-2/3 lg:w-1/2 p-4 border border-gray-300 rounded-xl shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all 
                           p-6 border border-gray-200 text-center"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {restaurant.name}
                </h2>
                <p className="text-gray-600">{restaurant.address}</p>

                {/* View Tables button */}
                <button
                  onClick={() => navigate(`/book/${restaurant.id}`)}
                  className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow 
                             hover:bg-gray-700 transition"
                >
                  View Tables
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center text-lg font-medium">
              No restaurants found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchRestaurant;
