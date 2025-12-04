import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthDataContext";
import Navbar from "../components/Nav";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

export default function Analysis() {
  const { serverUrl } = useContext(AuthDataContext);
  const [data, setData] = useState([]);

  const fetchComplaints = async () => {
    const res = await axios.get(serverUrl + "/api/complaint/complaints");
    setData(res.data.complaints || []);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ---------- DAILY ----------
  const today = new Date().toDateString();
  const dailyCount = data.filter(
    (c) => new Date(c.createdAt).toDateString() === today
  ).length;

  // ---------- WEEKLY ----------
  const last7days = new Date();
  last7days.setDate(last7days.getDate() - 7);

  const weeklyCount = data.filter(
    (c) => new Date(c.createdAt) >= last7days
  ).length;

  // ---------- MONTHLY ----------
  const monthlyData = Array(12).fill(0);
  data.forEach((c) => {
    const month = new Date(c.createdAt).getMonth();
    monthlyData[month]++;
  });

  // ---------- YEARLY ----------
  const yearly = {};
  data.forEach((c) => {
    const year = new Date(c.createdAt).getFullYear();
    yearly[year] = (yearly[year] || 0) + 1;
  });

  // ---------- STATUS PIE CHART ----------
  const statusCount = {
    Pending: data.filter((c) => c.status === "Pending").length,
    Processing: data.filter((c) => c.status === "Processing").length,
    Resolved: data.filter((c) => c.status === "Resolved").length,
  };

  return (
    <>
    <Navbar/>
   
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Complaint Analysis</h1>

      {/* DAILY + WEEKLY */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-5 shadow rounded-xl text-center">
          <h2 className="text-lg font-bold">Daily Complaints</h2>
          <p className="text-3xl font-semibold">{dailyCount}</p>
        </div>
        <div className="bg-white p-5 shadow rounded-xl text-center">
          <h2 className="text-lg font-bold">Last 7 Days</h2>
          <p className="text-3xl font-semibold">{weeklyCount}</p>
        </div>
      </div>

      {/* MONTHLY BAR CHART */}
      <div className="bg-white p-5 shadow rounded-xl">
        <h2 className="text-lg font-bold mb-3">Monthly Complaints</h2>
        <Bar
          data={{
            labels: [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            datasets: [
              {
                label: "Complaints",
                data: monthlyData,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          }}
        />
      </div>

      {/* YEARLY LINE CHART */}
      <div className="bg-white p-5 shadow rounded-xl">
        <h2 className="text-lg font-bold mb-3">Yearly Complaints</h2>
        <Line
          data={{
            labels: Object.keys(yearly),
            datasets: [
              {
                label: "Complaints",
                data: Object.values(yearly),
                borderColor: "blue",
                tension: 0.4,
              },
            ],
          }}
        />
      </div>

      {/* STATUS PIE */}
      <div className="bg-white p-5 shadow rounded-xl w-[400px]">
        <h2 className="text-lg font-bold mb-3">Status Distribution</h2>
        <Pie
          data={{
            labels: ["Pending", "Processing", "Resolved"],
            datasets: [
              {
                data: [
                  statusCount.Pending,
                  statusCount.Processing,
                  statusCount.Resolved,
                ],
                backgroundColor: ["orange", "blue", "green"],
              },
            ],
          }}
        />
      </div>
    </div>
     </>
  );
}
