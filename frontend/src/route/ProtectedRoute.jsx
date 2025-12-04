import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { userData, loading } = useContext(UserDataContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // ❌ If user not logged in → go to login
  if (!userData) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // ❌ If user logged in BUT not verified → block access
  if (!userData.isVerified) {
    return <Navigate to="/otpverification" state={{ from: location.pathname }} replace />;
  }

  // ✅ If verified → allow access
  return children;
};

export default ProtectedRoute;
