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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/sensors", sensorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Prediction Route (NEW)
app.post('/predict', (req, res) => {
  const symptomData = req.body; // Get symptom data from the request body

  // Convert the symptom data to JSON string
  const symptomsJson = JSON.stringify(symptomData);

  // Options for PythonShell
  let options = {
    pythonPath: 'python', // Ensure this points to your Python executable
    args: [symptomsJson]  // Pass the JSON data as an argument to the Python script
  };

  // Run the Python script
  PythonShell.run('C:/Users/ashok/OneDrive/Documents/healthcare/backend/predict.py', options, function (err, result) {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Return the prediction result to the frontend
      res.json({ prediction: result[0] });  // result[0] contains the prediction result
    }
  });
});


// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend URL
    credentials: true, // Required for cookies & authentication
  })
);

mongoose
  .connect(MONGO_URI) // Remove deprecated options
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
