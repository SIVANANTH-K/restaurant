import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) newErrors.name = "Name is required";
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
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // ✅ Fake registration success (skip backend)
    alert("Registration successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-extrabold text-center text-green-600">
          Join TableReserve
        </h1>
        <p className="text-gray-500 text-center mb-6 text-sm md:text-base">
          Create your account to start booking tables
        </p>

        <h2 className="text-2xl font-bold mb-0 text-center">Create Account</h2>
        <p className="text-gray-500 text-center mb-6 text-sm md:text-base">
          Fill in your details to get started
        </p>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="font-medium block mb-1">Account Type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="Customer">Customer</option>
            <option value="Owner">Owner</option>
          </select>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="font-medium block mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="font-medium block mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="font-medium block mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="font-medium block mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter password again"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4 text-sm md:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
