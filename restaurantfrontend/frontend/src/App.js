import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Search from "./pages/SearchRestaurant";
import ManageTables from "./pages/ManageTables";
import MyBookings from "./pages/MyBookings";
import NotificationPage from "./pages/NotificationPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNotifications from "./pages/AdminNotifications";
import ConfirmBookingPage from "./pages/ConfirmBookingPage";
import ApproveRestaurant from "./pages/ApproveRestaurant";
import ViewBookings from "./pages/ViewBookings";
import BookTablePage from "./pages/BookTablePage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
    <button
  onClick={() => {
    localStorage.setItem("role", "CUSTOMER");
    window.dispatchEvent(new Event("roleChange"));
  }}
>
  Fake Login as Customer
</button>
    <button
  onClick={() => {
    localStorage.setItem("role", "OWNER");
    window.dispatchEvent(new Event("roleChange"));
  }}
>
  Fake Login as Owner
</button>
    <button
  onClick={() => {
    localStorage.setItem("role", "ADMIN");
    window.dispatchEvent(new Event("roleChange"));
  }}
>
  Fake Login as Admin
</button>
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/confirm/:restaurantId/:tableId" element={<ConfirmBookingPage />} />
          <Route path="/manage-tables" element={<ManageTables />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/approve-restaurants" element={<ApproveRestaurant />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-notifications" element={<AdminNotifications />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/view-bookings" element={<ViewBookings />} />
          <Route path="/book/:restaurantId" element={<BookTablePage />} />
        </Routes>
      </AuthProvider>
    <Footer />
    </Router>
</>
  );
}

export default App;
