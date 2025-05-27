import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert("Đăng ký thành công!");
      navigate('/login');
    } catch (err) {
      alert(err.response.data.error || "Lỗi đăng ký");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
        <input
          className="w-full px-4 py-2 mb-4 border rounded"
          placeholder="Tên"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 mb-4 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full px-4 py-2 mb-4 border rounded"
          placeholder="Mật khẩu"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;
