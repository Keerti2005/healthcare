import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { PythonShell } from "python-shell"; // Import PythonShell for running Python scripts

// Import Routes
import sensorRoutes from "./routes/sensorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend URL
  credentials: true, // Required for cookies & authentication
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/sensors", sensorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Prediction Route (NEW)
app.post('/predict', (req, res) => {
  const symptomData = JSON.stringify(req.body); // Convert symptom data to JSON

  let options = {
    pythonPath: process.env.PYTHON_PATH || 'python', // Use environment variable for Python path
    args: [symptomData],  // Pass the JSON data as an argument to the Python script
  };

  PythonShell.run('./backend/predict.py', options, (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ prediction: result ? result[0] : "No prediction available" });
  });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB Connection Error:", err));
