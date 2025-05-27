import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function HistoryLookup() {
  const location = useLocation();
  const initialQuery = location.state?.query || ''; // ✅ lấy số vừa đặt nếu có
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (initialQuery) {
      fetchData(initialQuery);
    }
  }, [initialQuery]);

  const fetchData = async (q) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/history?query=${q}`);
      setResults(res.data);
    } catch (err) {
      alert("Không tìm thấy lịch hoặc có lỗi xảy ra.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchData(query);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Tra cứu lịch đã đặt</h2>
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Nhập số điện thoại hoặc email"
          required
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Tra cứu
        </button>
      </form>

      {results.length > 0 ? (
        <table className="w-full text-sm border">
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-2">Ngày</th>
              <th className="p-2">Dịch vụ</th>
              <th className="p-2">Stylist</th>
              <th className="p-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {results.map((appt) => (
              <tr key={appt._id}>
                <td className="p-2">{new Date(appt.date).toLocaleString()}</td>
                <td className="p-2">{appt.service}</td>
                <td className="p-2">{appt.stylist}</td>
                <td className="p-2 text-indigo-600 font-semibold">{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">Chưa có lịch nào hiển thị.</p>
      )}
    </div>
  );
}

export default HistoryLookup;
