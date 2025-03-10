import React, { useState } from "react";
import { FaHeartbeat, FaUserMd, FaCapsules } from "react-icons/fa";

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
      {/* Hero Section */}
      

      <div className="bg-white dark:bg-gray-900">
  {/* Navbar */}
  <header className="absolute inset-x-0 top-0 z-50">
    <nav className="flex items-center justify-between p-6 lg:px-12" aria-label="Global">
      <div className="flex lg:flex-1">
        
      </div>
      <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300">
          <span className="sr-only">Open main menu</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
     
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-lg font-semibold text-blue-600 hover:text-blue-700">Log in →</a>
      </div>
    </nav>
  </header>

  {/* Hero Section */}
  <div className="relative isolate px-6 pt-12 lg:px-8">
  <div className="absolute inset-x-0 -top-32 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-64" aria-hidden="true">
    <div className="relative left-[calc(50%-10rem)] w-[32rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-30 sm:left-[calc(50%-28rem)] sm:w-[64rem]" 
         style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}>
    </div>
  </div>

  <div className="mx-auto max-w-3xl py-24 sm:py-32 lg:py-40 text-center">
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Your Health, Powered by Data</h1>
    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
      Get real-time vitals, AI-driven insights, and seamless doctor appointments—all in one place.
    </p>
    <div className="mt-6 flex items-center justify-center gap-x-4">
      <a href="#" className="rounded-md bg-blue-600 px-5 py-2.5 text-lg font-semibold text-white shadow-md hover:bg-blue-700 focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">Get Started</a>
      <a href="#" className="text-lg font-semibold text-gray-900 dark:text-white">Learn More →</a>
    </div>
  </div>

  <div className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-24rem)]" aria-hidden="true">
    <div className="relative left-[calc(50%+2rem)] w-[32rem] -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-30 sm:left-[calc(50%+28rem)] sm:w-[64rem]" 
         style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}>
    </div>
  </div>
</div>

</div>


    

<section className="overflow-hidden bg-gray-100 dark:bg-gray-900 sm:grid sm:grid-cols-2">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-xl text-center sm:text-left">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
        Transform Your Healthcare Experience
      </h2>

      <p className="hidden text-gray-600 dark:text-gray-300 md:mt-4 md:block">
        Our smart healthcare platform provides real-time monitoring, AI-powered diagnostics, and
        seamless doctor-patient interactions to ensure better care.
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

  <img
    alt="Healthcare Tech"
    src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
    className="h-56 w-full object-cover sm:h-full"
  />
</section>


      {/* Features Section */}
      <section className="w-full px-6 py-10 bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          Explore our <span className="underline decoration-blue-500">Features</span>
        </h1>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
          {[FaHeartbeat, FaUserMd, FaCapsules].map((Icon, index) => (
            <div key={index} className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
              <span className="inline-block text-blue-500 dark:text-blue-400">
                <Icon className="w-8 h-8" />
              </span>
              <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                {index === 0 && "Real-time Health Monitoring"}
                {index === 1 && "Expert Medical Consultation"}
                {index === 2 && "Seamless Prescription Management"}
              </h1>
              <p className="text-gray-500 dark:text-gray-300">
                Our platform ensures accuracy and efficiency in delivering healthcare
                services.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container max-w-4xl px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
            Frequently Asked Questions
          </h1>
          <div className="mt-12 space-y-8">
            {faqs.map((question, index) => (
              <div key={index} className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
                <button
                  className="flex items-center justify-between w-full p-6"
                  onClick={() => toggleFAQ(index)}
                >
                  <h1 className="font-semibold text-gray-700 dark:text-white">{question}</h1>
                  <span className={`w-6 h-6 transition-transform transform ${openFAQ === index ? "rotate-180" : "rotate-0"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                </button>
                {openFAQ === index && (
                  <p className="p-6 text-sm text-gray-500 dark:text-gray-300">
                    Our services are designed to offer the best healthcare experience,
                    ensuring accessibility and affordability.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      

<footer class="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

    </>
  );
};

export default HealthcareLandingPage;
