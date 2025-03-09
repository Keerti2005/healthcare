import React from "react";
import { FaHeartbeat, FaUserMd, FaCapsules } from "react-icons/fa";

const HealthcareLandingPage = () => {
  return (
    <section className="w-full px-6 py-10 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
        Explore our <br /> awesome <span className="underline decoration-blue-500">Components</span>
      </h1>

      <p className="mt-4 text-gray-500 dark:text-gray-300">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus.
      </p>

      <div className="grid grid-cols-1 gap-8 mt-8 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
        {/* Card 1 */}
        <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
          <span className="inline-block text-blue-500 dark:text-blue-400">
            <FaHeartbeat className="w-8 h-8" />
          </span>
          <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
            Elegant Dark Mode
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
          <span className="inline-block text-blue-500 dark:text-blue-400">
            <FaUserMd className="w-8 h-8" />
          </span>
          <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
            Easy Customization
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
          <span className="inline-block text-blue-500 dark:text-blue-400">
            <FaCapsules className="w-8 h-8" />
          </span>
          <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
            Simple & Clean Designs
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HealthcareLandingPage;
