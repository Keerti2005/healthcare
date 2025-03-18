import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { HeartIcon } from "@heroicons/react/24/outline";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && document.getElementById("hs-pin-leaflet")) {
      if (!mapRef.current) {
        mapRef.current = L.map("hs-pin-leaflet", {
          center: [10.777, 77.026], // Kinathukaduvu Coordinates
          zoom: 14,
          maxBounds: [
            [5, 65], // Southern India
            [35, 100], // Northern India
          ],
          maxBoundsViscosity: 1.0,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          minZoom: 5,
          attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapRef.current);

        L.marker([10.777, 77.026])
          .bindPopup("Kinathukaduvu, Tamil Nadu, India 🇮🇳")
          .addTo(mapRef.current);
      }
    }
  }, []);

  return <div id="hs-pin-leaflet" className="h-[400px] w-full mt-6 rounded-lg border border-gray-700" />;
};
const InfoCard = ({ title, value }) => (
  <div className="bg-gray-800 text-white border border-gray-800 p-8 rounded-lg shadow-lg text-center">
    <Typography variant="h6">{title}</Typography>
    <p className="text-lg font-semibold">{value || "N/A"}</p>
  </div>
);

const ChartCard = ({ title, chartConfig }) => (
  <Card className="bg-black border border-gray-700 p-1">
    <CardBody className="px-6 pb-2 flex flex-col items-center">
      <Typography variant="h6" color="white" className="whitespace-nowrap">
        {title}
      </Typography>
      <div className="w-full overflow-hidden">
        <Chart {...chartConfig} />
      </div>
    </CardBody>
  </Card>
);

const HeartRateChart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("7d");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sensors")
      .then((response) => {
        console.log("API Response:", response.data);
        const uniqueData = removeDuplicates(response.data);
        setData(uniqueData);
      })
      .catch((error) => console.error("Error fetching sensor data:", error));
  }, []);

  const removeDuplicates = (sensorData) => {
    const uniqueMap = new Map();
    sensorData.forEach((item) => {
      if (item.timestamp) {
        uniqueMap.set(new Date(item.timestamp).getTime(), item);
      }
    });
    return Array.from(uniqueMap.values());
  };

  const filterData = () => {
    const now = new Date();
    return data
      .filter((d) => d.heartRate && d.spo2 && d.timestamp) // Remove invalid data
      .filter((d) => {
        const timestamp = new Date(d.timestamp);
        if (filter === "24h") return timestamp >= new Date(now - 24 * 60 * 60 * 1000);
        if (filter === "7d") return timestamp >= new Date(now - 7 * 24 * 60 * 60 * 1000);
        if (filter === "14d") return timestamp >= new Date(now - 14 * 24 * 60 * 60 * 1000);
        return true;
      });
  };

  const validData = filterData();
  const heartRateData = validData.map((d) => d.heartRate);
  const spo2Data = validData.map((d) => d.spo2);
  const tempData = validData.map((d) => d.temperature);
  const timestamps = validData.map((d) =>
    new Date(d.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );

  // Blood Pressure Data
  const systolicData = validData.map((d) => d.bloodPressure?.systolic || null);
  const diastolicData = validData.map((d) => d.bloodPressure?.diastolic || null);

  const commonChartOptions = {
    chart: { toolbar: { show: false }, background: "#000" },
    stroke: { curve: "smooth", width: 2 },
    markers: { size: 4 },
    xaxis: { categories: timestamps, labels: { style: { colors: "#ccc", fontSize: "12px" } } },
    yaxis: { labels: { style: { colors: "#ccc", fontSize: "12px" } } },
    grid: { borderColor: "#777", strokeDashArray: 2 },
    tooltip: { theme: "dark" },
    connectNulls: true,
  };

  const heartRateChartConfig = {
    type: "line",
    height: 250,
    width: "100%",
    series: [{ name: "Heart Rate (BPM)", data: heartRateData }],
    options: { ...commonChartOptions, colors: ["#1E90FF"] },
  };

  const spo2ChartConfig = {
    type: "line",
    height: 250,
    width: "100%",
    series: [{ name: "SpO₂ (%)", data: spo2Data }],
    options: { ...commonChartOptions, colors: ["#32CD32"] },
  };
  const latestData = data.length > 0 ? data[data.length - 1] : null;
  const bloodPressureChartConfig = {
    type: "line",
    height: 300,
    width: "100%",
    series: [
      { name: "Systolic (mmHg)", data: systolicData, color: "#FF4500" }, // Red
      { name: "Diastolic (mmHg)", data: diastolicData, color: "#1E90FF" }, // Blue
    ],
    options: {
      ...commonChartOptions,
      colors: ["#white", "#1E90FF"],
      stroke: { width: 3 },
      markers: { size: 0 },
    },
  };
  const temperatureChartConfig = {
    type: "line",
    height: 250,
    width: "100%",
    series: [{ name: "Temperature (°C)", data: tempData }],
    options: { ...commonChartOptions, colors: ["#800080"], markers: { size: 0 }, },
  };
  const ecgData = validData.flatMap((d) => (Array.isArray(d.ecg) ? d.ecg.map(Number) : []))
    .filter((val) => !isNaN(val) && val !== null); // Ensuring valid numbers

  const ECGChartConfig = {
    type: "line",
    height: 300,
    width: "100%",
    series: [{ name: "ECG Signal", data: ecgData }],
    options: {
      ...commonChartOptions,
      stroke: { curve: "smooth", width: 2 },
      markers: { size: 0 },
      colors: ["#FF1493"], // Pink for ECG
      xaxis: {
        categories: ecgData.map((_, index) => `T${index + 1}`), // Label X-axis as sample points
        labels: { style: { colors: "#ccc", fontSize: "12px" } },
      },
      yaxis: {
        labels: { style: { colors: "#ccc", fontSize: "12px" } },
        title: { text: "ECG Signal", style: { color: "#fff" } },
      },
      tooltip: { theme: "dark" },
    },
  };


  return (
    <div className="flex flex-col w-full px-8">
      {/* Dashboard Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-max rounded-lg bg-red-500 p-5 text-white">
          <HeartIcon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-white text-3xl font-bold">Vital Checking Dashboard</h1>
          <p className="text-gray-400 text-md mb-4">Monitor real-time data fluctuations.</p>
        </div>
      </div>

      {/* Latest Sensor Readings */}
      <h2 className="text-white text-2xl font-semibold w-full flex mb-4">Current Readings</h2>
      <div className="w-full flex justify-center mb-4 text-xl">
        <div className="grid grid-cols-5 gap-6 w-full">
          {latestData ? (
            <>
              <InfoCard title="Heart Rate" value={`${latestData.heartRate || "N/A"} BPM`} />
              <InfoCard title="SpO₂" value={`${latestData.spo2 || "N/A"} %`} />
              <InfoCard title="Temperature" value={`${latestData.temperature || "N/A"} °C`} />
              <InfoCard
                title="ECG"
                value={
                  Array.isArray(latestData.ecg) && latestData.ecg.length > 0
                    ? latestData.ecg.slice(0, 5).map((val) => parseFloat(val).toFixed(2)).join(", ")
                    : "N/A"
                }
              />
              <InfoCard
                title="Blood Pressure"
                value={
                  latestData.bloodPressure
                    ? `${latestData.bloodPressure.systolic || "N/A"}/${latestData.bloodPressure.diastolic || "N/A"} mmHg`
                    : "N/A"
                }
              />
            </>
          ) : (
            <p className="text-white">No data available</p>
          )}
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4 flex justify-end">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded-md bg-gray-800 text-gray-300">
          <option value="14d">14 Days</option>
          <option value="30d">30 Days</option>
          <option value="60d">60 Days</option>
        </select>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 w-full mb-6">
        <ChartCard title="Heart Rate (BPM)" chartConfig={heartRateChartConfig} />
        <ChartCard title="SpO₂ (%)" chartConfig={spo2ChartConfig} />
      </div>

      {/* Blood Pressure Chart with Gap Below */}
      <div className="mb-6">
        <ChartCard title="Blood Pressure (mmHg)" chartConfig={bloodPressureChartConfig} />
      </div>


      <div className="grid grid-cols-2 gap-6 w-full mb-6">
        <ChartCard title="ECG" chartConfig={ECGChartConfig} />
        <ChartCard title="Temperature (°C)" chartConfig={temperatureChartConfig} />
      </div>
      <MapComponent />
      <footer className="bg-black text-white rounded-lg shadow-lg p-4 border-t border-gray-800">
        <div className="w-full mx-auto max-w-screen-xl flex flex-col md:flex-row md:justify-between">
          <span className="text-sm">© 2023 MedTrack. All Rights Reserved.</span>
          <ul className="flex flex-wrap items-center mt-3 text-sm md:mt-0">
            <li><a href="#" className="hover:underline me-4">About</a></li>
            <li><a href="#" className="hover:underline me-4">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline me-4">Licensing</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </footer>
    </div>

  );
};

export default HeartRateChart;
