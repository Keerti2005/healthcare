import { useState, useMemo } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import SparklesCore from "../components/sparkles";

const Appointments = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    issue: "",
    doctor: "",
    date: "",
    time: "",
  });

  const doctors = [
    { name: "Dr. Smith", availableDates: ["2025-03-20", "2025-03-22"], availableTimes: ["10:00 AM", "2:00 PM"] },
    { name: "Dr. Johnson", availableDates: ["2025-03-21", "2025-03-23"], availableTimes: ["11:00 AM", "3:00 PM"] },
  ];

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Processing...",
      text: "Your appointment is being processed.",
      icon: "info",
      showConfirmButton: false,
      timer: 2000,
    });

    emailjs.send("service_16dexch", "template_p2qi3fn", formData, "BE27sNwuwamVexnTp")
      .then(() => {
        Swal.fire({
          title: "✅ Appointment Confirmed!",
          text: `A confirmation email has been sent to ${formData.email}.`,
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "❌ Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
        console.error("Email error:", error);
      });
  };

  // Memoize SparklesCore to prevent re-render issues
  const backgroundAnimation = useMemo(() => (
    <SparklesCore id="tsparticlesfullpage" background="transparent" minSize={0.6} maxSize={1.4} particleDensity={100} className="w-full h-full" particleColor="#FFFFFF" />
  ), []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background animation (memoized to prevent resets) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {backgroundAnimation}
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-3xl bg-gray-900 text-white rounded-lg shadow-lg p-8 z-10">
          <h2 className="text-2xl font-semibold text-center text-blue-400 mb-6">
            📅 Book an Appointment in MedTrack
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input type="text" name="name" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input type="email" name="email" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone</label>
              <input type="text" name="phone" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Age</label>
              <input type="text" name="age" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Gender</label>
              <select name="gender" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Describe Your Issue</label>
              <textarea name="issue" rows="3" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Doctor</label>
              <select name="doctor" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} required>
                <option value="">Select a Doctor</option>
                {doctors.map((doc, index) => (<option key={index} value={doc.name}>{doc.name}</option>))}
              </select>
            </div>
            {formData.doctor && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white">Date</label>
                  <select name="date" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} required>
                    <option value="">Select an Available Date</option>
                    {doctors.find((doc) => doc.name === formData.doctor)?.availableDates.map((date, index) => (<option key={index} value={date}>{date}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">Time</label>
                  <select name="time" className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange} required>
                    <option value="">Select an Available Time</option>
                    {doctors.find((doc) => doc.name === formData.doctor)?.availableTimes.map((time, index) => (<option key={index} value={time}>{time}</option>))}
                  </select>
                </div>
              </>
            )}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full px-5 py-2.5">
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
