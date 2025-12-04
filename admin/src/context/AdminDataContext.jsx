
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthDataContext } from './AuthDataContext';
import axios from 'axios';


export const AdminDataContext = createContext();




export const AdminProvider = ({ children }) => {

  const [adminData, setAdminData] = useState('');
  const { serverUrl } = useContext(AuthDataContext);
const [loading, setLoading] = useState(true);

  // Function to fetch current user
  const getAdminUsers = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/user/getAdminUsers', { withCredentials: true });
      setAdminData(result.data);
      console.log(result.data);
    } catch (error) {
      setAdminData(null);
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminUsers();
  }, []);
  
console.log("Admin Data Context:", adminData);

  // Value object for the context
let value = { getAdminUsers, adminData, setAdminData,loading,setLoading };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};

