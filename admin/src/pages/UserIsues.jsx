import React, { useContext, useEffect, useState } from "react";
import { AuthDataContext } from "../context/AuthDataContext";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

// EXPORT PACKAGES
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "../components/Nav";


const List = () => {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/complaint/complaints");
      setList(result.data.complaints || []);
      console.log("Complaints fetched:", result.data.complaints);
       toast.success("Complaint fetch succesfully");
    } catch (error) {
      toast.error("Error fetching complaints");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

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

  // ---------------- EXPORT TO EXCEL ----------------
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(list);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");
    XLSX.writeFile(workbook, "complaints.xlsx");
    toast.success("Excel exported");
  };

  // ---------------- EXPORT TO PDF ----------------
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Complaints Report", 14, 10);
    const tableData = list.map((item) => [
      item.name,
      item.mobile,
      item.issueTitle,
      item.issueType,
      item.status,
item.issueDescription,
item.address?.street,
item.address?.city,
item.address?.state,
item.address?.pincode,
      item.location?.lat,
      item.location?.lng,
    ]);

    autoTable(doc, {
    head: [["Title", "Type", "Mobile", "Status"]],
    body: list.map((item) => [
      item.issueTitle,
      item.issueType,
      item.mobile,
      item.status,
    ]),
  });

  doc.save("complaints.pdf");
    toast.success("PDF exported");
  };

  // ---------------- FILTER BY STATUS ----------------
  const pendingList = list.filter((item) => item.status === 'Pending');
  const progressList = list.filter((item) => item.status === "Processing");
  const resolvedList = list.filter((item) => item.status === "Resolved");

  const renderCard = (item) => (
    <div className="bg-white  backdrop-blur-md p-5 rounded-xl border border-gray-300 shadow-lg w-[90%] mb-6">
      <div className="flex gap-6">
        <img
          src={item.imageUrl}
          alt="Issue"
          className="w-[140px] h-[200px] rounded-lg object-cover"
        />

        <div className="text-white  flex flex-col gap-1">
          <h2 className="text-xl text-black font-semibold">Title:{item.issueTitle}</h2>
          <p className=" text-black">Type: {item.issueType}</p>
          <p className="text-black">Description: {item.issueDescription}</p>
          <p className="text-[#46d1f7] text-black font-semibold">Mo:
            +91 {item.mobile}
          </p>
          <p className=" text-black">By: {item.name}</p>
            <p className=" text-black">Address:
              {item.address?.street}
              ,{item.address?.city},{item.address?.state},{item.address?.pincode}
            </p>
          <p className=" text-black">
            Location → Lat: {item.location?.lat}, Lng: {item.location?.lng}
          </p>

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
        </div>
      </div>

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
    <Navbar/>
   <div className="bg-[#e6dfdfb8] p-8">


    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[30px] md:text-[40px] text-black font-bold">Complaints</h1>

        <div className="flex gap-3">
          <button
            onClick={exportExcel}
            className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Export Excel
          </button>

          <button
            onClick={exportPDF}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* STATUS SECTIONS */}
      <h2 className="text-2xl  text-black font-semibold mt-5 mb-2">Pending</h2>
      {pendingList.length > 0 ? pendingList.map(renderCard) : <p className="text-black">No pending complaints</p>}

      <h2 className="text-2xl text-black font-semibold mt-8 mb-2">In Progress</h2>
      {progressList.length > 0 ? progressList.map(renderCard) : <p className="text-black">No in-progress complaints</p>}

      <h2 className="text-2xl  text-black font-semibold mt-8 mb-2">Resolved</h2>
      {resolvedList.length > 0 ? resolvedList.map(renderCard) : <p className="text-black">No resolved complaints</p>}
     </div>
     </>
  );
};

export default List;
