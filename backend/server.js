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
app.post("/api/predict", (req, res) => {
  // Extract symptom data from the request body
  const symptoms = req.body;

  // Convert the symptoms object to a JSON string for Python
  const symptomsJson = JSON.stringify(symptoms);

  // Run the Python script to get the prediction
  PythonShell.run("predict.py", { args: [symptomsJson] }, (err, result) => {
    if (err) {
      console.error("Error running prediction script:", err);
      return res.status(500).send("Error predicting condition.");
    }

    // Return the prediction result
    return res.json({ prediction: result[0] });
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
