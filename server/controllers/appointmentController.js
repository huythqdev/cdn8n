const Appointment = require("../models/Appointment");
const axios = require("axios");

// Hàm gọi webhook n8n
async function notifyN8nBooking(appointment) {
  try {
    const webhookUrl =
      "https://ee7f-1-55-233-84.ngrok-free.app/webhook-test/aff006b1-d495-4d97-a8d8-085d97bf5bbd";  // Cập nhật URL ngrok mới

    const payload = {
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      date: appointment.date,
      time: appointment.time,
      service: appointment.service,
      stylist: appointment.stylist || "",
      note: appointment.note || "",
    };

    const response = await axios.post(webhookUrl, payload);

    console.log("✅ Gửi dữ liệu booking đến n8n thành công:", response.status);
  } catch (error) {
    console.error("❌ Lỗi khi gửi webhook đến n8n:", error.message);
  }
}

const createAppointmentAuth = async (req, res) => {
  try {
    const { date, time, service, stylist, note } = req.body;
    const userId = req.user.id;

    if (!date || !time || !service || !stylist) {
      return res.status(400).json({ message: "Thiếu thông tin đặt lịch." });
    }

    const appointmentDate = new Date(`${date}T${time}`);
    const now = new Date();

    if (appointmentDate <= now) {
      return res.status(400).json({
        message: "Thời gian đặt lịch phải sau thời gian hiện tại.",
      });
    }

    const [hour] = time.split(":").map(Number);
    if (hour < 8 || hour > 20) {
      return res.status(400).json({
        message: "Vui lòng chọn giờ trong khoảng 8:00 - 20:00.",
      });
    }

    const existing = await Appointment.findOne({ stylist, date: appointmentDate });
    if (existing) {
      return res.status(409).json({ message: "Stylist đã có lịch giờ này." });
    }

    const appointment = new Appointment({
      userId,
      date: appointmentDate,
      service,
      stylist,
      note,
    });

    await appointment.save();

    // Gọi webhook n8n
    await notifyN8nBooking(appointment);

    res.status(201).json({ message: "Đặt lịch thành công!", appointment });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = { createAppointmentAuth, notifyN8nBooking };
