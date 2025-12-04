import React, { createContext } from "react";

// Create context
export const AuthDataContext = createContext();

// Provider component
const AuthContext = ({ children }) => {
  const serverUrl = "http://localhost:8080";

  console.log("Server URL in AuthContext:", serverUrl);
  return (
    <AuthDataContext.Provider value={{ serverUrl }}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthContext;
