import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("7d");

  useEffect(() => {
    axios.get("http://localhost:5000/api/sensors")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching sensor data:", error));
  }, []);

  const filterData = () => {
    const now = new Date();
    let filteredData = data;
    if (filter === "24h") {
      filteredData = data.filter(d => new Date(d.timestamp) >= new Date(now - 24 * 60 * 60 * 1000));
    } else if (filter === "7d") {
      filteredData = data.filter(d => new Date(d.timestamp) >= new Date(now - 7 * 24 * 60 * 60 * 1000));
    } else if (filter === "14d") {
      filteredData = data.filter(d => new Date(d.timestamp) >= new Date(now - 14 * 24 * 60 * 60 * 1000));
    }
    return filteredData;
  };

  return (
    <div className="p-6 flex gap-6">
      <div className="w-1/2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Vital Signs Dashboard</h2>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Heart Rate (BPM)</h3>
        
        <div className="relative inline-block text-left mb-4">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
            onClick={() => document.getElementById('dropdown').classList.toggle('hidden')}> 
            Filter: {filter} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute mt-2">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li><button onClick={() => { setFilter("24h"); document.getElementById('dropdown').classList.add('hidden'); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">24 Hours</button></li>
              <li><button onClick={() => { setFilter("7d"); document.getElementById('dropdown').classList.add('hidden'); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">7 Days</button></li>
              <li><button onClick={() => { setFilter("14d"); document.getElementById('dropdown').classList.add('hidden'); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">14 Days</button></li>
            </ul>
          </div>
        </div>
        
        <div className="bg-black p-4 rounded-lg shadow-lg border-2 border-gray-400 w-full">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={filterData()}>
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(tick) => new Date(tick).toLocaleDateString("en-US", { month: "short", day: "numeric" })} 
                tick={{ fill: "#ffffff" }} 
                axisLine={{ stroke: "#ffffff" }} 
              />
              <YAxis domain={[50, 150]} tick={{ fill: "#ffffff" }} axisLine={{ stroke: "#ffffff" }} />
              <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
              <Line type="monotone" dataKey="heartRate" stroke="#ff6b6b" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="w-1/2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">SpO₂ Level</h3>
        <div className="bg-black p-4 rounded-lg shadow-lg border-2 border-gray-400 w-full">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={filterData()}>
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(tick) => new Date(tick).toLocaleDateString("en-US", { month: "short", day: "numeric" })} 
                tick={{ fill: "#ffffff" }} 
                axisLine={{ stroke: "#ffffff" }} 
              />
              <YAxis domain={[85, 100]} tick={{ fill: "#ffffff" }} axisLine={{ stroke: "#ffffff" }} />
              <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
              <Line type="monotone" dataKey="spo2" stroke="#4CAF50" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
