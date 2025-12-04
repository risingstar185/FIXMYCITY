import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthDataContext } from './AuthContext';
import axios from 'axios';

// Create the context
export const UserDataContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState('');
  const { serverUrl } = useContext(AuthDataContext);
const [loading, setLoading] = useState(true);

  // Function to fetch current user
  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/user/getCurrentUser', { withCredentials: true });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);


  // Value object for the context
let value = { getCurrentUser, userData, setUserData,loading,setLoading };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};
