import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import MyAppointments from "./pages/MyAppointments";
import Home from "./pages/Home";
import HistoryLookup from "./pages/HistoryLookup";
import Confirm from "./pages/Confirm";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Trang chủ */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/tra-cuu-lich" element={<HistoryLookup />} />
        <Route path="/confirm" element={<Confirm />} />    {/* Trang xác nhận */}
        <Route path="/cancel" element={<Cancel />} />      {/* Trang hủy lịch */}
      </Routes>
    </Router>
  );
}

export default App;
