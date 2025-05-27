const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Appointment = require("../models/Appointment");
const { createAppointmentAuth } = require("../controllers/appointmentController");
const axios = require("axios");

// Middleware xác thực
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Thiếu token" });
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token không hợp lệ" });
  }
};

// Hàm gọi webhook n8n với URL ngrok mới
async function notifyN8nBooking(appointment) {
  try {
    const webhookUrl =
      " https://ee7f-1-55-233-84.ngrok-free.app/webhook-test/aff006b1-d495-4d97-a8d8-085d97bf5bbd";

    const payload = {
      id: appointment._id,
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      date: appointment.date,
      time: appointment.time,
      service: appointment.service,
      stylist: appointment.stylist || "",
      note: appointment.note || "",
      status: appointment.status,
    };

    const response = await axios.post(webhookUrl, payload);
    console.log("✅ Gửi dữ liệu booking đến n8n thành công:", response.status);
  } catch (error) {
    console.error("❌ Lỗi khi gửi webhook đến n8n:", error.message);
  }
}

// Route xác nhận lịch hẹn (GET)
router.get("/confirm", async (req, res) => {
  console.log("Request đến GET /confirm với appointmentId:", req.query.appointmentId);
  const { appointmentId } = req.query;
  if (!appointmentId) return res.status(400).send("Thiếu ID lịch hẹn.");

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).send("Lịch hẹn không tồn tại.");

    if (appointment.status === "confirmed") {
      return res.send("Lịch hẹn đã được xác nhận trước đó.");
    }
    if (appointment.status === "cancelled") {
      return res.send("Lịch hẹn đã bị hủy, không thể xác nhận.");
    }

    appointment.status = "confirmed";
    await appointment.save();

    await notifyN8nBooking(appointment);

    return res.send("Cảm ơn bạn đã xác nhận lịch hẹn.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Lỗi server.");
  }
});

// Route xác nhận lịch hẹn (POST) — để n8n gọi webhook dạng POST
router.post("/confirm", async (req, res) => {
  console.log("Request đến POST /confirm với appointmentId:", req.body.appointmentId);
  const { appointmentId } = req.body;
  if (!appointmentId) return res.status(400).send("Thiếu ID lịch hẹn.");

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).send("Lịch hẹn không tồn tại.");

    if (appointment.status === "confirmed") {
      return res.send("Lịch hẹn đã được xác nhận trước đó.");
    }
    if (appointment.status === "cancelled") {
      return res.send("Lịch hẹn đã bị hủy, không thể xác nhận.");
    }

    appointment.status = "confirmed";
    await appointment.save();

    await notifyN8nBooking(appointment);

    return res.send("Cảm ơn bạn đã xác nhận lịch hẹn.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Lỗi server.");
  }
});

// Route hủy lịch hẹn (GET)
router.get("/cancel", async (req, res) => {
  console.log("Request đến GET /cancel với appointmentId:", req.query.appointmentId);
  const { appointmentId } = req.query;
  if (!appointmentId) return res.status(400).send("Thiếu ID lịch hẹn.");

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).send("Lịch hẹn không tồn tại.");

    if (appointment.status === "cancelled") {
      return res.send("Lịch hẹn đã được hủy trước đó.");
    }

    appointment.status = "cancelled";
    await appointment.save();

    await notifyN8nBooking(appointment);

    return res.send("Bạn đã hủy lịch hẹn thành công.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Lỗi server.");
  }
});

// Route hủy lịch hẹn (POST) — để n8n gọi webhook dạng POST
router.post("/cancel", async (req, res) => {
  console.log("Request đến POST /cancel với appointmentId:", req.body.appointmentId);
  const { appointmentId } = req.body;
  if (!appointmentId) return res.status(400).send("Thiếu ID lịch hẹn.");

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).send("Lịch hẹn không tồn tại.");

    if (appointment.status === "cancelled") {
      return res.send("Lịch hẹn đã được hủy trước đó.");
    }

    appointment.status = "cancelled";
    await appointment.save();

    await notifyN8nBooking(appointment);

    return res.send("Bạn đã hủy lịch hẹn thành công.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Lỗi server.");
  }
});

// 📌 Public: Đặt lịch không cần đăng nhập
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, service, stylist, note } = req.body;

    if (!name || !email || !phone || !date || !time || !service) {
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
        message: "Thời gian không hợp lệ. Vui lòng chọn trong khoảng 8:00 - 20:00.",
      });
    }

    const existing = await Appointment.findOne({ email, date: appointmentDate });
    if (existing) {
      return res.status(409).json({
        message: "Bạn đã đặt lịch vào thời gian này. Vui lòng chọn thời gian khác.",
      });
    }

    const appointment = new Appointment({
      userId: null,
      name,
      email,
      phone,
      date: appointmentDate,
      service,
      stylist,
      note,
      status: "pending",
    });

    await appointment.save();

    // Gọi webhook n8n sau khi lưu thành công
    await notifyN8nBooking(appointment);

    res.status(201).json({ message: "Đặt lịch thành công!", appointment });
  } catch (error) {
    console.error("❌ Lỗi đặt lịch:", error);
    res.status(500).json({ message: "Lỗi máy chủ.", error: error.message });
  }
});

// Route lấy lịch sử
router.get("/history", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Thiếu số điện thoại hoặc email." });
  }

  try {
    const appointments = await Appointment.find({
      $or: [{ phone: query }, { email: query }],
    }).sort({ date: -1 });

    res.json(appointments);
  } catch (err) {
    console.error("❌ Lỗi truy vấn lịch sử:", err);
    res.status(500).json({ message: "Lỗi máy chủ.", error: err.message });
  }
});

// Route tạo lịch hẹn cho user đã xác thực
router.post("/auth", auth, createAppointmentAuth);

// Route lấy danh sách lịch hẹn của user đã xác thực
router.get("/", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route lấy toàn bộ lịch hẹn (admin)
router.get("/all", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Không có quyền" });
  try {
    const appointments = await Appointment.find().populate("userId", "name email");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
