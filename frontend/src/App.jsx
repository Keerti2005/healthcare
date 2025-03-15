import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import SymptomChecker from "./pages/SymptomChecker";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="w-full min-h-screen flex bg-black">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main content area - Adjusts margin dynamically */}
        <div
          className={`flex-1 p-5 overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/doctor-connect" element={<Appointments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
