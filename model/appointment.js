const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: Date,
  time: String,
  isTimeSlotAvailable: Boolean,
});

const appointment = mongoose.model("appointment", appointmentSchema);

module.exports = appointment;
