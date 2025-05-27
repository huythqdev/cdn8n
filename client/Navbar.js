// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <Link to="/" className="text-2xl font-bold text-indigo-600">✂️ HairSalon</Link>
      <div className="space-x-4">
        <Link to="/booking" className="text-gray-700 hover:text-indigo-500 font-medium">Đặt lịch</Link>
        <Link to="/my-appointments" className="text-gray-700 hover:text-indigo-500 font-medium">Lịch đã đặt</Link>
        <Link to="/login" className="text-gray-700 hover:text-indigo-500 font-medium">Đăng nhập</Link>
      </div>
    </nav>
  );
}

export default Navbar;
