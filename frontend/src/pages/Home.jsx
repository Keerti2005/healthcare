import React, { useState } from "react";
import { FaHeartbeat, FaUserMd, FaCapsules } from "react-icons/fa";
import SparklesCore from "../components/sparkles";
import { SparklesPreview } from "../components/SparklesPreview";
import { Button } from "../components/Button";
const HealthcareLandingPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    "How can I pay for my appointment?",
    "Is the cost of the appointment covered by private health insurance?",
    "Do I need a referral?",
    "What are your opening hours?",
    "What can I expect at my first consultation?",
  ];

  return (
    <>
      {/* Full Page Background with Sparkles */}
      <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">

        {/* Sparkles Effect - Applied to Full Page */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="relative z-10">
          {/* Sparkles Effect for starting page */}
          <div className="relative z-90 mt-60 pointer-events-none select-none text-center">
            <h1 className="md:text-2xl lg:text-7xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400">
              Welcome to MedTrack App
            </h1>
            <h2 className="md:text-2xl lg:text-5xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400">
              Your Health, Powered by Data
            </h2>
            <p className="text-neutral-300 md:text-lg lg:text-xl mt-4">
              Your health, our priority. Connect with doctors, monitor vitals, and stay healthy.
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <FaHeartbeat className="text-red-500 text-4xl" />
              <FaUserMd className="text-blue-500 text-4xl" />
              <FaCapsules className="text-green-500 text-4xl" />
            </div>
            <a
              href="#"
              className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
              Learn More
            </a>
          </div>

          <section className="relative overflow-hidden bg-black sm:grid sm:grid-cols-2">
            {/* Sparkles Effect for Hero Section */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <SparklesCore
                id="tsparticleshero"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>

            <div className="relative mt-50 p-8 md:p-12 lg:px-16 lg:py-24 z-10">
              <div className="mx-auto max-w-xl text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Transform Your Healthcare Experience
                </h2>
                <p className="hidden text-gray-300 md:mt-4 md:block">
                  Our smart healthcare platform provides real-time monitoring, AI-powered diagnostics, and seamless doctor-patient interactions to ensure better care.
                </p>
                <div className="mt-4 md:mt-8">
                  <a
                    href="#"
                    className="inline-block rounded-lg bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                  >
                    Get Started Today
                  </a>
                </div>
              </div>
            </div>

            <div className="relative mt-65 z-10">
              <img
                alt="Healthcare Tech"
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                className="h-56 w-full object-cover sm:h-full relative"
              />
            </div>
          </section>


          {/* Features Section */}
          <section className="w-full mt-30 px-6 py-10">
            <h1 className="text-3xl font-semibold text-white capitalize text-center">Explore our Features</h1>
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-3">
              {[FaHeartbeat, FaUserMd, FaCapsules].map((Icon, index) => (
                <div key={index} className="p-8 space-y-3 border-2 border-blue-400 rounded-xl bg-black bg-opacity-50">
                  <span className="inline-block text-blue-400">
                    <Icon className="w-8 h-8" />
                  </span>
                  <h1 className="text-xl font-semibold text-white">
                    {index === 0 && "Real-time Health Monitoring"}
                    {index === 1 && "Expert Medical Consultation"}
                    {index === 2 && "Seamless Prescription Management"}
                  </h1>
                  <p className="text-gray-300">
                    Our platform ensures accuracy and efficiency in delivering healthcare services.
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="px-6 mt-20 py-10">
            <h1 className="text-3xl font-semibold text-center text-white">Frequently Asked Questions</h1>
            <div className="mt-12 space-y-8">
              {faqs.map((question, index) => (
                <div key={index} className="border-2 border-gray-700 rounded-lg bg-black bg-opacity-50">
                  <button className="flex items-center justify-between w-full p-6" onClick={() => toggleFAQ(index)}>
                    <h1 className="font-semibold text-white">{question}</h1>
                    <span className={`w-6 h-6 transition-transform transform ${openFAQ === index ? "rotate-180" : "rotate-0"}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </span>
                  </button>
                  {openFAQ === index && (
                    <p className="p-6 text-gray-300">Our services are designed to offer the best healthcare experience, ensuring accessibility and affordability.</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-black text-white rounded-lg shadow-lg p-4 border-t border-gray-800">
            <div className="w-full mx-auto max-w-screen-xl flex flex-col md:flex-row md:justify-between">
              <span className="text-sm">© 2025 MedTrack. All Rights Reserved.</span>
              <ul className="flex flex-wrap items-center mt-3 text-sm md:mt-0">
                <li><a href="#" className="hover:underline me-4">About</a></li>
                <li><a href="#" className="hover:underline me-4">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline me-4">Licensing</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default HealthcareLandingPage;
