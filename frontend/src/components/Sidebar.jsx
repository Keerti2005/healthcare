import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaUserMd, FaHeartbeat, FaCog } from "react-icons/fa";
import { LayoutDashboard } from "lucide-react";
import { FaRobot } from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="p-2 mb-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars size={20} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center mb-6">
          <img
            className="w-auto h-7"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
          {isOpen && (
            <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white">
              MedTrack
            </span>
          )}
        </Link>

        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col gap-3">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
          >
            <FaHome size={20} />
            {isOpen && <span className="ml-3">Home</span>}
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
          >
            <LayoutDashboard
              size={20}
              className="text-gray-400 dark:text-gray-300 fill-current"
            />
            {isOpen && <span className="ml-3">Dashboard</span>}
          </Link>

          <Link
            to="/symptom-checker"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
          >
            <FaUserMd size={20} />
            {isOpen && <span className="ml-3">Symptom Checker</span>}
          </Link>

          <Link
            to="/doctor-connect"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
          >
            <FaHeartbeat size={20} />
            {isOpen && <span className="ml-3">Doctor Connect</span>}
          </Link>
          <Link
            to="/chatbot"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
          >
            <FaRobot size={20} />
            {isOpen && <span className="ml-3">ChatBot</span>}
          </Link>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"
          >
            <FaCog size={20} />
            {isOpen && <span className="ml-3">Settings</span>}
          </Link>
        </nav>
      </aside>

     
    </>
  );
};

export default Sidebar;