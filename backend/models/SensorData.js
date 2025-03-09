import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  heartRate: Number,
  temperature: Number,
  bloodPressure: String,
  ecg: String,
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model("SensorData", SensorDataSchema);
export default SensorData;
