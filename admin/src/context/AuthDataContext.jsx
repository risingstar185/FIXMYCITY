import React, { createContext } from 'react';

export const AuthDataContext = createContext();

const AuthContext = ({ children }) => {
  const serverUrl = 'https://fixmycity-backend-org.onrender.com';
  const value = { serverUrl };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthContext;
