import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/sensors").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Vital Signs Dashboard</h2>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
