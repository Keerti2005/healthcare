import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Import Routes (Fix imports)
import sensorRoutes from "./routes/sensorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express app

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/sensors", sensorRoutes);
app.use("/api/appointments", appointmentRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
app.use(
  cors({
    origin: "http://localhost:3001", // ✅ Allow frontend URL
    credentials: true, // ✅ Required for cookies & authentication
  })
);

mongoose
  .connect(MONGO_URI) // Remove deprecated options
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

