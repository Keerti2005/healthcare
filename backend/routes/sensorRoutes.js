import express from "express";
import SensorData from "../models/SensorData.js"; // Convert require to import

const router = express.Router();

// Store Sensor Data
router.post("/add", async (req, res) => {
  try {
    const data = new SensorData(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Sensor Data
router.get("/", async (req, res) => {
  const data = await SensorData.find().sort({ timestamp: -1 });
  res.json(data);
});

export default router;
