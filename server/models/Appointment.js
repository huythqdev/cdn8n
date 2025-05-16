const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  service: String,
  stylist: String,
  note: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
