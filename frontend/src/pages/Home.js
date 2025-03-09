import React from "react";
import { Button } from "../components/Button"; 
import { Card, CardContent } from "../components/Card";

import { FaHeartbeat, FaCalendarCheck, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-blue-900 shadow-md">
        <h1 className="text-2xl font-bold">HealthCare 360</h1>
        <div>
          <Button className="mr-2 bg-blue-700 hover:bg-blue-600">Login</Button>
          <Button className="bg-gray-800 hover:bg-gray-700">Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-20 px-5">
        <motion.h2 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Your Health, Our Priority
        </motion.h2>
        <p className="text-lg text-gray-400 max-w-lg mx-auto">
          Monitor vitals, book appointments, and access reports in one place.
        </p>
        <div className="mt-6">
          <Button className="bg-blue-700 hover:bg-blue-600 mx-2">Book Appointment</Button>
          <Button className="bg-gray-800 hover:bg-gray-700">View Reports</Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-20">
        <FeatureCard icon={<FaHeartbeat />} title="Live Vitals Monitoring" desc="Track real-time heart rate, temperature, and ECG." />
        <FeatureCard icon={<FaCalendarCheck />} title="Easy Appointments" desc="Book and manage doctor visits seamlessly." />
        <FeatureCard icon={<FaChartLine />} title="Health Analytics" desc="Get AI-driven health insights and reports." />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center"
    >
      <div className="text-blue-500 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </motion.div>
  );
};

export default Homepage;
