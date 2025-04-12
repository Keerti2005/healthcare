import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import SymptomChecker from "./pages/SymptomChecker";
import GptChatPage from "./pages/GptChatPage";
import HuggingChatbot from "./components/GptChatBot";

function AppContent({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();

  return (
    <div className="w-full min-h-screen flex bg-black">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

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
          <Route path="/chatbot" element={<GptChatPage />} />
        </Routes>

        {/* Floating chatbot icon on all pages except chatbot page */}
        {location.pathname !== "/chatbot" && <HuggingChatbot />}
      </div>
    </div>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <AppContent
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </Router>
  );
}

export default App;