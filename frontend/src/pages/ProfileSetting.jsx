import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ProfilePage from "./ProfileMain";
import ContactUs from "./ContactUs";
import Home from "./Home";
import Orders from "./ViewAllIssues.jsx";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { MdBorderColor, MdOutlineDownloading, MdOutlineContactSupport } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthDataContext } from "../context/AuthContext.jsx";
import { UserDataContext } from "../context/UserContext.jsx";
import { motion } from "framer-motion";

import Certificate from "./Cerificate.jsx";
import ReportNew from "../complaint/ReportNew.jsx";

const ProfileSetting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext);
  const { serverUrl } = useContext(AuthDataContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
      setUserData(null);
      toast.success("Logged out successfully!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout error: Please try again later.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile": return <ProfilePage />;
      case "contact": return <ReportNew />;
      case "orders": return <Orders />;
      case "contactUs": return <ContactUs />;
      case "certificate": return <Certificate />;
      default: return <ProfilePage />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto bg-white shadow-2xl rounded-3xl border border-gray-100"
    >

      {/* ---------------- MOBILE NAVBAR ---------------- */}
      <div className="md:hidden sticky top-0 bg-white shadow-md z-50">
        <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap p-3 gap-3">

          <button onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-full text-sm font-medium 
            ${activeTab === "profile" ? "bg-purple-600 text-white" : "bg-gray-200"}`}>
            Profile
          </button>

          <button onClick={() => setActiveTab("contact")}
            className={`px-4 py-2 rounded-full text-sm font-medium 
            ${activeTab === "contact" ? "bg-purple-600 text-white" : "bg-gray-200"}`}>
            Report Issue
          </button>

          <button onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-full text-sm font-medium 
            ${activeTab === "orders" ? "bg-purple-600 text-white" : "bg-gray-200"}`}>
            All Issues
          </button>

          <button onClick={() => setActiveTab("certificate")}
            className={`px-4 py-2 rounded-full text-sm font-medium 
            ${activeTab === "certificate" ? "bg-purple-600 text-white" : "bg-gray-200"}`}>
            Certificate
          </button>

          <button onClick={() => setActiveTab("contactUs")}
            className={`px-4 py-2 rounded-full text-sm font-medium 
            ${activeTab === "contactUs" ? "bg-purple-600 text-white" : "bg-gray-200"}`}>
            Contact Us
          </button>
            <button onClick={() => navigate("/")}
            className={`px-4 py-2 rounded-full text-sm font-medium 
            bg-gray-200`}>
            Home
          </button>

        </div>
      </div>

      {/* ---------------- MAIN LAYOUT ---------------- */}
      <div className="flex min-h-screen bg-[#ebf2f9a2]">

        {/* ---------------- DESKTOP SIDEBAR ---------------- */}
        <aside className="hidden md:flex w-1/4 bg-[#ebf2f9a2] shadow-lg border-r border-gray-200 flex-col">

          <div className="p-6 text-center border-b border-gray-100">
            <h2 className="text-[40px] font-bold text-[#7B2FF7]">
              Profile Settings
            </h2>
          </div>

          <nav className="flex-1 p-6 space-y-4">

            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:text-white shadow hover:bg-purple-700 transition"
              onClick={() => setActiveTab("profile")}>
              <CgProfile className="w-6 h-6" />
              <span className="font-medium">Profile Image</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:text-white shadow hover:bg-purple-700 transition"
              onClick={() => setActiveTab("contact")}>
              <FaPlus className="w-6 h-6" />
              <span className="font-medium">Report New Issue</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:text-white shadow hover:bg-purple-700 transition"
              onClick={() => setActiveTab("orders")}>
              <MdBorderColor className="w-6 h-6" />
              <span className="font-medium">View All Issues</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:text-white shadow hover:bg-purple-700 transition"
              onClick={() => setActiveTab("certificate")}>
              <MdOutlineDownloading className="w-6 h-6" />
              <span className="font-medium">Claim Certificate</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:text-white shadow hover:bg-purple-700 transition"
              onClick={() => setActiveTab("contactUs")}>
              <MdOutlineContactSupport className="w-6 h-6" />
              <span className="font-medium">Contact Us</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:text-white shadow hover:bg-purple-700 transition"
              onClick={() => navigate("/")}>
              <FaHome className="w-6 h-6" />
              <span className="font-medium">Home</span>
            </button>

            <button type="button" onClick={handleLogout}
              className="w-full flex items-center mt-[200px] text-red-500 space-x-3 px-4 py-3 rounded-lg hover:text-white shadow hover:bg-purple-700 transition">
              <FaSignOutAlt className="w-6 h-6" />
              <span className="font-medium">Logout</span>
            </button>

          </nav>
        </aside>

        {/* ---------------- CONTENT AREA ---------------- */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>

    </motion.div>
  );
};

export default ProfileSetting;
