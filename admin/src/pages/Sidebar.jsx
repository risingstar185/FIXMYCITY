import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import Home from "../pages/Home";
import List from "./UserIsues";
import Analysis from "./Analysis";
import AdminUserList from "./AllUsers";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "ComplaintsPage":
        return <List />;
      case "Analysis":
        return <Analysis />;
      case "AllUsers":
        return <AdminUserList />;
      default:
        return <Home />;
    }
  };

  const menuItems = [
    { key: "Home", label: "Home", icon: <FaHome className="text-xl" /> },
    { key: "ComplaintsPage", label: "Complaints", icon: <TbReportSearch className="text-xl" /> },
    { key: "Analysis", label: "Analysis", icon: <GrAnalytics className="text-xl" /> },
    { key: "AllUsers", label: "Users", icon: <FaUsers className="text-xl" /> },
  ];

  return (
    <>
      <div className="flex">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block w-64 h-screen bg-[#f8f5ff] border-r border-gray-300 p-4">
          <h2 className="text-2xl font-bold text-purple-700 mb-8 ml-2">
            Admin Panel
          </h2>

          <ul className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition
                ${activeTab === item.key ? "bg-purple-600 text-white" : "bg-gray-200 text-black"}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 mb-16 md:mb-0">{renderContent()}</div>
      </div>

      {/* MOBILE BOTTOM NAV — LIKE YOUTUBE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-300">
        <div className="flex justify-around py-2 overflow-x-auto no-scrollbar">

          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex flex-col items-center px-4 py-2 
              ${activeTab === item.key ? "text-purple-600" : "text-gray-600"}`}
            >
              {item.icon}
              <span className="text-[12px] mt-1">{item.label}</span>
            </button>
          ))}

        </div>
      </div>
    </>
  );
};

export default Sidebar;
