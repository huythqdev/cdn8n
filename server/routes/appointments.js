const router = require('express').Router();
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');

// Middleware kiểm tra token
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Thiếu token' });
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token không hợp lệ' });
  }
};

// Đặt lịch
router.post('/', auth, async (req, res) => {
  const { date, service, stylist, note } = req.body;
  const appointment = await Appointment.create({
    userId: req.user.id,
    date, service, stylist, note
  });
  res.json(appointment);
});

// Lấy lịch người dùng
router.get('/', auth, async (req, res) => {
  const appointments = await Appointment.find({ userId: req.user.id });
  res.json(appointments);
});

// (Tuỳ chọn) Admin xem tất cả lịch
router.get('/all', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Không có quyền' });
  const appointments = await Appointment.find().populate('userId', 'name email');
  res.json(appointments);
});

module.exports = router;
