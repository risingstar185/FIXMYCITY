import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Nav";

export default function AboutComplaintApp() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" mx-auto bg-white shadow-2xl rounded-3xl p-10 lg:p-12 border border-gray-100"
      >
    
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 text-center">
          Empowering Communities: About Our Civic Complaint System
        </h1>

        <p className="text-gray-700 leading-relaxed mb-8 text-lg text-center max-w-3xl mx-auto">
          The **Civic Complaint System** is an innovative platform dedicated to fostering active citizen participation and efficient governance. We empower individuals to report local issues seamlessly, ensuring prompt and accountable resolution by relevant authorities.
        </p>

        {/* Image - Placed strategically for visual break and context */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="my-10 overflow-hidden rounded-2xl shadow-xl border border-gray-200"
        >
          {" "}
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
          Our Vision & Mission
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8 text-base">
          Our **vision** is to cultivate responsive and transparent local governance through technology. Our **mission** is to bridge the communication gap between citizens and authorities by providing a highly accessible, fast, and transparent reporting ecosystem. Every complaint submitted through our platform is meticulously tracked, monitored, and updated in real-time to maintain the highest levels of accountability and efficiency.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
          Key Features & Benefits
        </h2>
        <ul className="list-disc pl-8 text-gray-700 space-y-3 mb-8 text-base">
          <li className="flex items-start">
            <span className="text-blue-500 text-xl mr-3 mt-0.5">▪</span>
            **Visual Reporting:** Enhance clarity and context by submitting complaints accompanied by high-quality photographs.
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 text-xl mr-3 mt-0.5">▪</span>
            **Instant Capture:** Utilize your device's camera to capture and upload images directly within the reporting process.
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 text-xl mr-3 mt-0.5">▪</span>
            **Precision Location:** Benefit from automatic geolocation detection, ensuring accurate and precise tracking of reported issues.
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 text-xl mr-3 mt-0.5">▪</span>
            **Transparent Updates:** Receive real-time status updates (e.g., "Received," "In Progress," "Resolved") to keep you informed every step of the way.
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 text-xl mr-3 mt-0.5">▪</span>
            **Comprehensive History:** Access and review all your previously submitted complaints and their resolution statuses in a centralized dashboard.
          </li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
          Driving Positive Change
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8 text-base">
          Traditional methods of reporting civic problems are often cumbersome and inefficient. We developed this system to revolutionize the process, making it intuitive, responsive, and exceptionally user-friendly. With a mobile-first design philosophy and seamless real-time communication, our platform ensures that your voice is not just heard, but actively acknowledged and acted upon, leading to tangible resolutions.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="bg-blue-600 text-white p-8 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <h3 className="text-3xl font-bold mb-3">Your Involvement Shapes Our Future</h3>
          <p className="text-lg leading-relaxed">
            Every single complaint you report is a step towards a better community. Join us in building cleaner, safer, and more connected environments for everyone. Your active participation is the cornerstone of collective progress.
          </p>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}