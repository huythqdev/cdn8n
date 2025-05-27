import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem("token", res.data.token);
      alert("Đăng nhập thành công!");
      navigate('/booking');
    } catch (err) {
      alert(err.response.data.error || "Lỗi đăng nhập");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Đăng Nhập</h2>
        <input
          type="email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Mật khẩu"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-300"
        >
          Đăng nhập
        </button>
        <p className="text-sm text-center mt-4">
          Chưa có tài khoản? <a href="/register" className="text-blue-500 hover:underline">Đăng ký</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
