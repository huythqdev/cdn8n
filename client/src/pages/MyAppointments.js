import React, { useEffect, useState } from 'react';
import API from '../api';

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        API.get('/appointments')
            .then((res) => setAppointments(res.data))
            .catch((err) => alert('Không lấy được dữ liệu'));
    }, []);

    const filteredAppointments = appointments.filter((appt) => {
        if (filter === 'all') return true;
        return appt.status === filter;
    });

    const statusLabel = {
        pending: '⏳ Chờ xác nhận',
        confirmed: '✅ Đã xác nhận',
        cancelled: '❌ Đã hủy',
    };

    const statusColor = {
        pending: 'text-yellow-500',
        confirmed: 'text-green-600',
        cancelled: 'text-red-500',
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">Lịch đã đặt</h2>

            <div className="flex justify-center gap-4 mb-6">
                {['all', 'pending', 'confirmed', 'cancelled'].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-4 py-1 border rounded ${filter === s
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-indigo-600 hover:bg-gray-200'
                            }`}
                    >
                        {s === 'all'
                            ? 'Tất cả'
                            : s === 'pending'
                                ? '⏳ Chờ'
                                : s === 'confirmed'
                                    ? '✅ Đã xác nhận'
                                    : '❌ Đã hủy'}
                    </button>
                ))}
            </div>

            {filteredAppointments.length === 0 ? (
                <p className="text-gray-500 text-center">Không có lịch nào hiển thị.</p>
            ) : (
                <table className="w-full border-collapse text-sm sm:text-base">
                    <thead>
                        <tr className="bg-indigo-100 text-left">
                            <th className="p-2">Ngày</th>
                            <th className="p-2">Dịch vụ</th>
                            <th className="p-2">Thợ</th>
                            <th className="p-2">Ghi chú</th>
                            <th className="p-2">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appt) => (
                            <tr key={appt._id} className="border-t">
                                <td className="p-2">{new Date(appt.date).toLocaleString()}</td>
                                <td className="p-2">{appt.service}</td>
                                <td className="p-2">{appt.stylist}</td>
                                <td className="p-2">{appt.note}</td>
                                <td className={`p-2 font-semibold ${statusColor[appt.status]}`}>
                                    {statusLabel[appt.status]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MyAppointments;
