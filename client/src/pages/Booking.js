import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();
  const validTimes = generateValidTimes();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(validTimes[0]);
  const [service, setService] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Vui lòng nhập họ và tên.";
    if (!email.trim()) errs.email = "Vui lòng nhập email.";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Email không hợp lệ.";
    if (!phone.trim()) errs.phone = "Vui lòng nhập số điện thoại.";
    else if (!/^[0-9]{10,11}$/.test(phone)) errs.phone = "Số điện thoại phải 10 hoặc 11 chữ số.";
    if (!date) errs.date = "Vui lòng chọn ngày.";
    if (!time) errs.time = "Vui lòng chọn giờ.";
    if (!service) errs.service = "Vui lòng chọn dịch vụ.";

    if (date && time) {
      const selectedDateTime = new Date(`${date}T${time}`);
      const now = new Date();
      if (selectedDateTime <= now) {
        errs.date = "Ngày giờ đặt lịch phải sau thời gian hiện tại.";
        errs.time = "Ngày giờ đặt lịch phải sau thời gian hiện tại.";
      }
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length !== 0) return;

    setIsSubmitting(true);
    try {
      await axios.post("/api/appointments", {
        name,
        email,
        phone,
        date,
        time,
        service,
      });
      alert("Đặt lịch thành công!");
      navigate("/tra-cuu-lich", { state: { query: phone } });
    } catch (err) {
      console.error(err);
      alert("Lỗi khi đặt lịch.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-10 rounded-2xl shadow-xl ring-1 ring-indigo-200">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 tracking-wide">
        Đặt lịch hẹn
      </h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Họ và tên */}
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className={`w-full border rounded-lg px-4 py-3 text-lg transition 
              focus:outline-none focus:ring-4 focus:ring-indigo-300 
              ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className={`w-full border rounded-lg px-4 py-3 text-lg transition 
              focus:outline-none focus:ring-4 focus:ring-indigo-300 
              ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
        </div>

        {/* Số điện thoại */}
        <div>
          <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0912345678"
            className={`w-full border rounded-lg px-4 py-3 text-lg transition 
              focus:outline-none focus:ring-4 focus:ring-indigo-300
              ${errors.phone ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.phone && <p className="mt-1 text-red-600 text-sm">{errors.phone}</p>}
        </div>

        {/* Ngày */}
        <div>
          <label htmlFor="date" className="block mb-2 font-semibold text-gray-700">
            Chọn ngày <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            className={`w-full border rounded-lg px-4 py-3 text-lg transition 
              focus:outline-none focus:ring-4 focus:ring-indigo-300
              ${errors.date ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.date && <p className="mt-1 text-red-600 text-sm">{errors.date}</p>}
        </div>

        {/* Giờ */}
        <div>
          <label htmlFor="time" className="block mb-2 font-semibold text-gray-700">
            Chọn giờ <span className="text-red-500">*</span>
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`w-full border rounded-lg px-4 py-3 text-lg transition
              focus:outline-none focus:ring-4 focus:ring-indigo-300
              ${errors.time ? "border-red-500" : "border-gray-300"}`}
          >
            {validTimes.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && <p className="mt-1 text-red-600 text-sm">{errors.time}</p>}
        </div>

        {/* Dịch vụ */}
        <div>
          <label htmlFor="service" className="block mb-2 font-semibold text-gray-700">
            Dịch vụ <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`w-full border rounded-lg px-4 py-3 text-lg transition
              focus:outline-none focus:ring-4 focus:ring-indigo-300
              ${errors.service ? "border-red-500" : "border-gray-300"}`}
            required
          >
            <option value="" disabled>-- Chọn dịch vụ --</option>
            <option value="Cắt tóc nam">Cắt tóc nam</option>
            <option value="Nhuộm tóc thời trang">Nhuộm tóc thời trang</option>
            <option value="Uốn tóc nữ">Uốn tóc nữ</option>
            <option value="Gội đầu thư giãn">Gội đầu thư giãn</option>
            <option value="Chăm sóc tóc">Chăm sóc tóc</option>
          </select>
          {errors.service && <p className="mt-1 text-red-600 text-sm">{errors.service}</p>}
        </div>

        {/* Nút gửi */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl text-xl font-bold text-white
            ${isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} 
            transition duration-300`}
        >
          {isSubmitting ? "Đang xử lý..." : "Đặt lịch ngay"}
        </button>
      </form>

      <div className="flex justify-between mt-10">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          ⬅ Trang chủ
        </button>
        <button
          onClick={() => navigate("/tra-cuu-lich")}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          📄 Xem lịch đã đặt
        </button>
      </div>
    </div>
  );
};

function generateValidTimes() {
  const times = [];
  for (let hour = 8; hour <= 19; hour++) {
    times.push(`${hour}:00`, `${hour}:30`);
  }
  times.push("20:00");
  return times;
}

export default BookingForm;
