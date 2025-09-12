import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmBookingPage = () => {
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();

  const [confirmed, setConfirmed] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    specialRequest: "",
  });

  // ✅ Fetch restaurant details from backend
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/restaurants/${restaurantId}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err))
  }, [restaurantId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirm = async () => {
    if (!confirmed) {
      alert("⚠️ Please check the confirmation box before proceeding.");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/reservations", {
  restaurantId: restaurantId,
  tableId: tableId,
  reservationTime: "2025-08-20T18:30:00",
  confirmed: true,
  userId: 5
});

      alert(
        `✅ Booking Confirmed for ${restaurant?.name || "Restaurant"} at Table ${tableId}`
      );
      navigate(`/book/${restaurantId}`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("❌ Booking failed. Try again.");
    }
  };


  if (!restaurant) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">
          Restaurant not found or data is incomplete
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-100 py-12 px-6 sm:px-10 flex justify-center">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Confirm Your Booking
        </h1>

        {/* ✅ Restaurant & Table Info */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700">
            {restaurant.name || "Unknown Restaurant"}
          </p>
          <p className="text-gray-600">{restaurant.address || "Address N/A"}</p>
          <p className="mt-3 text-gray-700">
            <span className="font-medium">Table:</span> {tableId}
          </p>
        </div>

        {/* Booking Form */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500"
            required
          />
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={formData.guests}
            min="1"
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500"
          />
          <textarea
            name="specialRequest"
            placeholder="Special Requests (optional)"
            value={formData.specialRequest}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Confirmation Checkbox */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="w-5 h-5 text-gray-800 border-gray-400 rounded focus:ring-gray-600"
          />
          <label className="ml-3 text-gray-700">
            I confirm that I want to book this table.
          </label>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full px-5 py-3 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-700 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ConfirmBookingPage;
