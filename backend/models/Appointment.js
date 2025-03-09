import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  date: String,
  time: String,
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
