import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaChartLine, FaBell } from "react-icons/fa";
import Navbar from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

import { useState,useEffect } from "react";

import axios from "axios";
import { AuthDataContext } from "../context/AuthDataContext";
import { useContext } from "react";

export default function AdminHome() {
  const { serverUrl } = useContext(AuthDataContext);
const [stats, setStats] = useState({
  users:[],
  complaints:[]
});


  console.log('home',stats);
  useEffect(() => {
     axios.post(`${serverUrl}/api/auth/get-allUsers`)
      .then(res => setStats(res.data))
      .catch(err => console.log(err));

      axios.get(serverUrl + "/api/complaint/complaints")
      .then(res => setStats(prevStats => ({...prevStats, complaints: res.data.complaints})))
      .catch(err => console.log(err));

  }, [])

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 min-h-screen bg-[#eef2ff]"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-purple-700 tracking-wide">
            Municipal Admin Dashboard
          </h1>
        </div>

        {/* BANNER WITH TEXT OVERLAY */}
        <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-xl mb-10">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
            alt="Municipality Admin"
            className="w-full h-full object-cover brightness-75"
          />

          {/* TEXT OVER IMAGE */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <h1 className="text-white text-5xl font-extrabold drop-shadow-lg">
              Welcome, Admin 👋
            </h1>
            <p className="text-white text-lg font-medium mt-2 opacity-90">
              Municipal Complaint & City Management System
            </p>
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {/* Total Users */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-200"
          >
            <FaUsers className="text-purple-600 text-4xl" />
            <div>
              <p className="text-lg font-semibold">Registered Citizens</p>
              <p className="text-4xl">{stats?.users?.length}</p>
            </div>
          </motion.div>

          {/* Total Complaints */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-200"
          >
            <FaChartLine className="text-purple-600 text-4xl" />
            <div>
              <p className="text-lg font-semibold">Total Complaints</p>
              <h2 className="text-3xl font-bold text-gray-800">{stats?.complaints?.length}</h2>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-200"
          >
            <FaBell className="text-purple-600 text-4xl" />
            <div>
              <p className="text-lg font-semibold">Pending Alerts</p>
              <h2 className="text-3xl font-bold text-gray-800">9</h2>
            </div>
          </motion.div>
        </div>
  <Footer/>
      </motion.div>
    </>
  );
}
