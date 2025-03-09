import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaTachometerAlt, FaUserMd, FaHeartbeat } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen bg-gray-900 text-white ${isOpen ? "w-64" : "w-20"} transition-all duration-300 fixed top-0 left-0`}>
      {/* Toggle Button */}
      <div className="p-4 flex justify-end">
        <FaBars className="cursor-pointer text-2xl" onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Menu Items */}
      <nav className="mt-10">
        <SidebarItem to="/" icon={<FaHome />} text="Home" isOpen={isOpen} />
        <SidebarItem to="/dashboard" icon={<FaTachometerAlt />} text="Dashboard" isOpen={isOpen} />
        <SidebarItem to="/symptom-checker" icon={<FaHeartbeat />} text="Symptom Checker" isOpen={isOpen} />
        <SidebarItem to="/doctor-connect" icon={<FaUserMd />} text="Doctor Connect" isOpen={isOpen} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ to, icon, text, isOpen }) => (
  <Link to={to} className="flex items-center p-3 hover:bg-blue-700 transition-all">
    <div className="text-xl">{icon}</div>
    {isOpen && <span className="ml-4">{text}</span>}
  </Link>
);

export default Sidebar;
