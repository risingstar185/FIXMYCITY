import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthDataContext";
import { toast } from "react-toastify";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  const fetchUsers = async () => {
    try {
      const res = await axios.post(`${serverUrl}/api/auth/get-allUsers`);
      
      // Data object ki form me aata hai → res.data.users ya res.data
      const fetchedUsers = res.data.users || res.data;

      // Latest user first (reverse sorting by createdAt)
      const sortedUsers = [...fetchedUsers].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setUsers(sortedUsers);

      console.log(sortedUsers);
    } catch (err) {
      console.log("Error fetching users:", err);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl text-purple-500 font-bold mb-6">All Users</h1>

      {users.length > 0 ? (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 p-4 border rounded-xl shadow-sm flex justify-between items-center"
            >
              {/* User Details */}
              <div>
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-400 text-sm">
                  Joined: {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default AdminUserList;
