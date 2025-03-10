import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  heartRate: { type: Number, required: true },
  spo2: { type: Number, required: true },
  temperature: { type: Number, required: true },
  ecg: { type: [Number], required: true }, // Array of ECG values
  bloodPressure: {
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true }
  },
  timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model("SensorData", SensorDataSchema);
export default SensorData;
