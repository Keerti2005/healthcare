import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // 👈 Create this next
import { useState } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <AppRoutes isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </Router>
  );
}

export default App;
