import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Admin Logging in with:", email, password);
      navigate("/admin/dashboard"); // redirect to admin dashboard
      // TODO: Send login request to backend
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Welcome Message */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-gray-800">
          Admin Login
        </h1>
        <p className="text-gray-500 text-center mb-6 text-sm sm:text-base">
          Enter your admin credentials to access the dashboard
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="font-medium block mb-1">Admin Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="font-medium block mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 transition-all duration-200"
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
