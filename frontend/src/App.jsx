import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Home";       
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import SymptomChecker from "./pages/SymptomChecker";


function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="ml-20 p-5 w-full">
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
