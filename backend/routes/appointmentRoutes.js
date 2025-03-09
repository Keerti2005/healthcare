import express from "express";
import Appointment from "../models/Appointment.js"; // Convert require to import

const router = express.Router();

// Create an Appointment
router.post("/book", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Appointments
router.get("/", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

export default router;
