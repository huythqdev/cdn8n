const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name: String,
  email: String,
  phone: String,
  date: Date,
  time: String, // không bắt buộc vì date có sẵn giờ
  service: String,
  stylist: String,
  note: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
