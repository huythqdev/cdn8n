import React, { useEffect, useState } from "react";

const Confirm = () => {
  const [message, setMessage] = useState("Đang xác nhận lịch...");
  const [error, setError] = useState(null);

  // Lấy appointmentId từ URL
  const params = new URLSearchParams(window.location.search);
  const appointmentId = params.get("appointmentId");

  useEffect(() => {
    if (!appointmentId) {
      setError("Không tìm thấy ID lịch hẹn.");
      setMessage(null);
      return;
    }

    // Gọi API xác nhận lịch (POST hoặc GET tùy backend)
    fetch("https://your-api-domain.com/api/appointments/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ appointmentId }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err || "Lỗi xác nhận lịch.");
        }
        return res.text();
      })
      .then((text) => {
        setMessage(text || "Xác nhận lịch thành công!");
      })
      .catch((err) => {
        setError(err.message);
        setMessage(null);
      });
  }, [appointmentId]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Xác nhận lịch hẹn</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
    </div>
  );
};

export default Confirm;
