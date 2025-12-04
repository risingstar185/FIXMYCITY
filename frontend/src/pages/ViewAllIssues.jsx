import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import Navbar from "../components/Nav";
import { UserDataContext } from "../context/UserContext";

const ComplaintCard = ({ complaint, onDelete }) => {
  const { _id, name, issueType, issueTitle, status, imageUrl } = complaint;
  const isResolved = status === "Resolved";
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden 
                   transition-all duration-300 ease-in-out 
                   hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
      <img
        src={imageUrl}
        alt={`Image for ${issueTitle}`}
        className="w-full h-48 object-cover"
      />

      {/* 2. Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Status Badge */}
        <span
          className={`px-3 py-1 mb-3 rounded-full text-xs font-semibold self-start
            ${isResolved
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {status}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">IssueTitle:  
            {issueTitle}
        </h3>

        {/* Details */}
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p>
            <strong>Submitter:</strong> {name}
          </p>
          <p>
            <strong>Type:</strong> {issueType}
          </p>
        </div>

        {/* 3. Action (Delete Button) - Only show if not resolved */}
        {!isResolved && (
          <button
            className="mt-auto bg-red-600 text-white px-4 py-2 rounded-lg 
                       hover:bg-red-700 transition-colors duration-200 
                       font-medium self-start"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click effect when clicking button
              onDelete(_id);
            }}
          >
            Delete
          </button>
        )}
        {/* Show a "Resolved" state if applicable */}
        {isResolved && (
          <p className="mt-auto text-sm font-bold text-green-600">
            Resolved 🤩
          </p>
        )}
      </div>
    </div>
  );
};

// --- Main View Component ---
const ViewAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);         // Added error state
  const { serverUrl } = useContext(AuthDataContext);
const { userData } = useContext(UserDataContext);
  // Fetch Complaints

  useEffect(() => {

    const userId = userData?._id; // ⭐ FIX: Get userId properly

    if (!userId) return; // wait until userData loads
    const fetchComplaints = async () => {
      try {
        setIsLoading(true); // Start loading
        setError(null);     // Clear previous errors
        
        const res = await axios.get(`${serverUrl}/api/complaint/complaints/${userId}`)
        setComplaints(res.data || []);
        console.log("Fetched Complaints:", res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Failed to load complaints. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchComplaints();
  }, [serverUrl]); // Added serverUrl as dependency

  // Delete Complaint
  const deleteComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      await axios.delete(serverUrl + `/api/complaint/complaints/${id}`);
      // Optimistic UI update: remove from state immediately
      setComplaints(complaints.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
      // You could set an error state here (e.g., "Failed to delete")
      alert("Error: Could not delete complaint.");
    }
  };

  // Separate by status using useMemo for performance.
  // This avoids re-calculating on every render unless 'complaints' changes.
  const pending = useMemo(
    () => complaints.filter(
      (c) => c.status === "Processing" || c.status === "Pending"
    ),
    [complaints]
  );

  const resolved = useMemo(
    () => complaints.filter((c) => c.status === "Resolved"),
    [complaints]
  );
  if (isLoading) {
    return (
      <>   <Navbar />
        <div className="flex justify-center items-center min-h-screen">
               <div className="text-xl font-semibold">Loading complaints...</div>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl font-semibold text-red-600 bg-red-100 p-6 rounded-lg"> {error}</div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          All Complaints
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Pending Complaints Column */}
          <section>
            <h2 className="text-2xl font-semibold mb-5 text-yellow-700 flex items-center gap-2">
              🕗 Pending Complaints ({pending.length})
            </h2>
            <div className="space-y-6">
              {pending.length === 0 ? (
                <p className="text-gray-500 bg-white p-6 rounded-lg shadow-sm">
                  No pending complaints found.
                </p>
              ) : (
                pending.map((c) => (
                  <ComplaintCard
                    key={c._id}
                    complaint={c}
                    onDelete={deleteComplaint}
                  />
                ))
              )}
            </div>
          </section>

          {/* Resolved Complaints Column */}
          <section>
            <h2 className="text-2xl font-semibold mb-5 text-green-700 flex items-center gap-2">
              ✅ Resolved Complaints ({resolved.length})
            </h2>
            <div className="space-y-6">
              {resolved.length === 0 ? (
                <p className="text-gray-500 bg-white p-6 rounded-lg shadow-sm">
                  No resolved complaints found.
                </p>
              ) : (
                resolved.map((c) => (
                  <ComplaintCard
                    key={c._id}
                    complaint={c}
                    onDelete={deleteComplaint} // Delete fn won't be called, but passing is harmless
                  />
                ))
              )}
            </div>
          </section>

        </div>
      </main>
    </>
  );
};

export default ViewAllComplaints;