import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const PublicRoute = ({ children }) => {
  const { userData, loading } = useContext(UserDataContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (userData) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
};

export default PublicRoute;
