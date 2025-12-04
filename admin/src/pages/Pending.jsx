import React, { useContext, useEffect, useState } from "react";
import { AuthDataContext } from "../context/AuthDataContext";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Navbar from "../components/Nav";
import { Navigate } from "react-router-dom";

const Pending = () => {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  // ---------------- Fetch Complaints ----------------
  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/complaint/complaints");
      setList(result.data.complaints || []);
    } catch (error) {
      toast.error("Error fetching complaints");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // ---------------- Delete Complaint ----------------
  const removeList = async (id) => {
    try {
      const result = await axios.delete(
        `${serverUrl}/api/complaint/complaints/${id}`
      );

      if (result.status === 200) {
        toast.success("Complaint deleted");
        fetchList();
      }
    } catch (error) {
      toast.error("Error deleting complaint");
    }
  };

  // ---------------- Update Status API ----------------
  const updateStatus = async (id, newStatus) => {
    try {
      const result = await axios.put(
        `${serverUrl}/api/complaint/complaints/${id}`,
        { status: newStatus }
      );
toast.success("Status update succesfully");

      if (result.data.success) {
        toast.success("Status updated");
      fetchList()
       
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  // ---------------- Export Excel ---------------
  // ---------------- Export PDF ---------------
  // ---------------- Filter Status ----------------
  const pendingList = list.filter((item) => item.status === "Pending");
  const progressList = list.filter((item) => item.status === "Processing");
  const resolvedList = list.filter((item) => item.status === "Resolved");

  // ---------------- Complaint Card ----------------
  const renderCard = (item) => (
    <div className="bg-white p-5 rounded-xl border border-gray-300 shadow-lg w-[90%] mb-6">
      <div className="flex gap-6">
        <img
          src={item.imageUrl}
          alt="Issue"
          className="w-[140px] h-[200px] rounded-lg object-cover"
        />

        <div className="flex flex-col gap-1 text-black">
          <h2 className="text-xl font-semibold">Title: {item.issueTitle}</h2>
          <p>Type: {item.issueType}</p>
          <p>Description: {item.issueDescription}</p>
          <p className="font-semibold">Mobile: +91 {item.mobile}</p>
          <p>By: {item.name}</p>
          <p>
            Location → Lat: {item.location?.lat}, Lng: {item.location?.lng}
          </p>

          {/* Status badge */}
          <span
            className={`px-3 py-1 rounded-lg text-sm font-bold w-fit mt-1 ${
              item.status === "Pending"
                ? "bg-yellow-500"
                : item.status === "Processing"
                ? "bg-blue-500"
                : "bg-green-600"
            }`}
          >
            {item.status}
          </span>

          {/* Status update */}
          <select
            className="mt-3 px-3 py-2 rounded-md border bg-white"
            value={item.status}
            onChange={(e) => updateStatus(item._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Delete Button */}
      <div className="flex justify-end mt-3">
        <button
          onClick={() => removeList(item._id)}
          className="text-red-500 hover:text-red-600 transition-all"
        >
          <MdDelete size={28} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-[#e6dfdfb8] p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[30px] md:text-[40px] text-black font-bold">
            Complaints
          </h1>

        
        </div>

        {/* Status Sections */}
        <h2 className="text-2xl font-semibold text-black mt-5 mb-2">Pending</h2>
        {pendingList.length > 0
          ? pendingList.map(renderCard)
          : <p className="text-black">No pending complaints</p>}

        <h2 className="text-2xl font-semibold text-black mt-8 mb-2">In Progress</h2>
        {progressList.length > 0
          ? progressList.map(renderCard)
          : <p className="text-black">No in-progress complaints</p>}

        <h2 className="text-2xl font-semibold text-black mt-8 mb-2">Resolved</h2>
        {resolvedList.length > 0
          ? resolvedList.map(renderCard)
          : <p className="text-black">No resolved complaints</p>}
      </div>
    </>
  );
};

export default Pending;
