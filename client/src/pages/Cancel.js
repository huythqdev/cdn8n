import React, { useEffect, useState } from "react";

const Cancel = () => {
    const [message, setMessage] = useState("Đang hủy lịch...");
    const [error, setError] = useState(null);

    const params = new URLSearchParams(window.location.search);
    const appointmentId = params.get("appointmentId");

    useEffect(() => {
        if (!appointmentId) {
            setError("Không tìm thấy ID lịch hẹn.");
            setMessage(null);
            return;
        }

        fetch("https://your-api-domain.com/api/appointments/cancel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ appointmentId }),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.text();
                    throw new Error(err || "Lỗi hủy lịch.");
                }
                return res.text();
            })
            .then((text) => {
                setMessage(text || "Hủy lịch thành công!");
            })
            .catch((err) => {
                setError(err.message);
                setMessage(null);
            });
    }, [appointmentId]);

    return (
        <div style={{ padding: 20 }}>
            <h2>Hủy lịch hẹn</h2>
            {message && <p>{message}</p>}
            {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
        </div>
    );
};

export default Cancel;
