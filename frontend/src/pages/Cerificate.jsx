import React, { useRef, useContext, useEffect, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import axios from "axios";
import { FaAward, FaLock, FaCheckCircle } from "react-icons/fa";
import { UserDataContext } from "../context/UserContext";
import { AuthDataContext } from "../context/AuthContext";

// Define certificate dimensions as constants
const CERT_WIDTH = 842;
const CERT_HEIGHT = 595;

const Certificate = () => {
  const certRef = useRef();
  const { userData } = useContext(UserDataContext);
  const { serverUrl } = useContext(AuthDataContext);

  const [complaintCount, setComplaintCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // State for responsive scaling
  const [scale, setScale] = useState(1);

  const UNLOCK_THRESHOLD = 3;

  // Effect for fetching complaint data
  useEffect(() => {
    const userId = userData?._id;
    if (!userId) {
      setLoading(false); // Stop loading if no user ID
      return;
    }

    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${serverUrl}/api/complaint/complaints/${userId}`
        );
        setComplaintCount(res.data.length);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
      setLoading(false);
    };

    fetchComplaints();
  }, [userData, serverUrl]); // Added serverUrl as dependency

  // Effect for calculating and updating scale on resize
  useEffect(() => {
    const updateScale = () => {
      if (typeof window !== "undefined") {
        // Calculate scale with 32px (16px on each side) padding
        const padding = 32;
        const newScale = Math.min((window.innerWidth - padding) / CERT_WIDTH, 1);
        setScale(newScale);
      }
    };

    // Set initial scale and add listener
    updateScale();
    window.addEventListener("resize", updateScale);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateScale);
  }, []); // Empty dependency array ensures this runs only once on mount

  const isLocked = complaintCount < UNLOCK_THRESHOLD;

  const dateIssued = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadPNG = async () => {
    if (isLocked || !certRef.current) return;
    try {
      // Use pixelRatio: 2 for higher quality
      const dataUrl = await toPng(certRef.current, { 
        quality: 1.0,
        pixelRatio: 2 
      });
      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.log("PNG Download Error:", error);
    }
  };

  const downloadPDF = async () => {
    if (isLocked || !certRef.current) return;
    try {
      const dataUrl = await toPng(certRef.current, { 
        quality: 1.0,
        pixelRatio: 2 
      });
      
      // A4 landscape dimensions in points: 842w x 595h
      const pdf = new jsPDF("landscape", "pt", "a4");
      pdf.addImage(dataUrl, "PNG", 0, 0, CERT_WIDTH, CERT_HEIGHT);
      pdf.save("certificate.pdf");
    } catch (error) {
      console.log("PDF Download Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col w-auto justify-center items-center h-screen text-white p-4 text-center">
        <FaCheckCircle className="text-5xl text-blue-400 mb-4 animate-pulse" />
        <p className="text-xl font-medium">Loading your certificate...</p>
      </div>
    );
  }

  return (
  <div className="w-auto  mx-auto flex flex-col items-center bg-gray-800 min-h-screen py-4 px-3 text-white">

      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Your Contribution Certificate
      </h1>

      {/* This wrapper creates a positioning context for the locked overlay.
        It's centered and allows the certificate preview to scale correctly.
      */}
      <div className="relative w-auto flex justify-center overflow-x-auto">
      
        <div
          ref={certRef}
          style={{
            width: `${CERT_WIDTH}px`,
            height: `${CERT_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className={`bg-white text-black rounded-lg shadow-2xl transition-all
            ${isLocked ? "opacity-50 blur-sm" : ""}`}
        >
          {/* --- Certificate Content --- */}
          <div className="w-full h-full p-8 border-4 border-blue-900 flex flex-col">
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-5xl font-bold text-blue-900 font-serif">
                  Certificate
                </h2>
                <p className="text-2xl text-gray-700 font-serif">
                  OF CONTRIBUTION
                </p>
              </div>
              <div className="w-28 h-28 rounded-full bg-blue-900 flex flex-col justify-center items-center text-white p-2 text-center">
                <FaAward className="text-5xl text-yellow-400" />
                <p className="text-xs mt-1 font-bold uppercase">FixMyCity</p>
              </div>
            </div>

            {/* BODY */}
            <div className="flex flex-col justify-center items-center text-center flex-grow">
              <p className="text-lg text-gray-600 mb-2">
                This certificate is proudly presented to:
              </p>
              <p className="text-4xl font-bold text-gray-800 font-serif truncate px-4">
                {userData?.name || "Valued Citizen"}
              </p>
              <p className="text-lg text-gray-700 mt-4 max-w-2xl">
                For actively contributing to improving our community by
                reporting civic issues on <b>FixMyCity</b>.
              </p>
              <p className="text-xl font-semibold text-blue-900 mt-2">
                Total Contributions: {complaintCount}
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between mt-10">
              <div className="text-center">
                <p className="italic text-xl">Ayush Patel</p>
                <div className="border-t w-48 text-gray-600 mt-1">
                  FixMyCity Admin
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg">{dateIssued}</p>
                <div className="border-t w-48 text-gray-600 mt-1">Date Issued</div>
              </div>
            </div>
          </div>
          {/* --- End Certificate Content --- */}
        </div>
        {isLocked && (
          <div
            className="absolute top-0 flex flex-col justify-center items-center 
                       bg-black bg-opacity-70 text-white text-center rounded-lg p-4"
            style={{
              width: `${CERT_WIDTH * scale}px`, // Match scaled width
              height: `${CERT_HEIGHT * scale}px`, // Match scaled height
              maxWidth: '100%', // Prevent overflow
            }}
          >
            <FaLock className="text-5xl text-red-400 mb-3" />
            <p className="text-xl font-bold">Certificate Locked</p>
            <p className="text-lg text-red-200 mt-2">
              You need{" "}
              <b>{UNLOCK_THRESHOLD - complaintCount}</b> more contribution(s).
            </p>
          </div>
        )}
      </div>

      {/* Helper text for mobile users */}
      <p className="text-sm text-gray-400 mt-4 md:hidden text-center">
        Certificate preview is scaled to fit.
        <br />
        Download for full quality.
      </p>

      {/* BUTTONS (Already responsive, no changes needed) */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
        <button
          onClick={downloadPNG}
          disabled={isLocked}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-colors duration-200
            ${isLocked
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          Download PNG
        </button>

        <button
          onClick={downloadPDF}
          disabled={isLocked}
          className={`w-full py-3 rounded-lg font-bold text-lg transition-colors duration-200
            ${isLocked
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Certificate;